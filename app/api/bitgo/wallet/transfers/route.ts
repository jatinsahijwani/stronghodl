import { NextResponse } from 'next/server'
import bitgo, { coin, defaultWalletId } from '@/lib/bitgo'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') ?? '25')

    const sdk = bitgo.coin(coin)
    const wallet = await sdk.wallets().get({ id: defaultWalletId })

    const transfers = await wallet.transfers({ limit } as any) as any

    const formatted = (transfers.transfers ?? []).map((tx: any) => ({
      id: tx.id,
      txid: tx.txid,
      type: tx.type,
      value: tx.value ?? 0,
      valueString: tx.valueString ?? '0',
      feeString: tx.feeString ?? '0',
      date: tx.date,
      state: tx.state,
      comment: tx.comment ?? null,
      entries: (tx.entries ?? []).map((e: any) => ({
        address: e.address,
        value: e.value,
        valueString: e.valueString,
      })),
      confirmations: tx.confirmations ?? 0,
    }))

    return NextResponse.json({
      success: true,
      transfers: formatted,
      total: transfers.totalCount ?? formatted.length,
      limit,
    })
  } catch (error: unknown) {
    console.error('[BitGo] Transfers fetch error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch transfers',
      },
      { status: 500 }
    )
  }
}