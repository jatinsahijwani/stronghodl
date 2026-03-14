import { NextResponse } from 'next/server'
import bitgo, { coin, defaultWalletId } from '@/lib/bitgo'

const BITGO_API = 'https://app.bitgo-test.com/api/v2'
const ACCESS_TOKEN = process.env.BITGO_ACCESS_TOKEN!

export async function GET() {
  try {
    const sdk = bitgo.coin(coin)
    const wallet = await sdk.wallets().get({ id: defaultWalletId })
    const walletData = wallet.toJSON() as any

    return NextResponse.json({
      success: true,
      policy: walletData.admin?.policy ?? null,
      approvalsRequired: walletData.approvalsRequired ?? 1,
    })
  } catch (error: unknown) {
    console.error('[BitGo] Policy fetch error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch policy' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { approvalsRequired } = body as { approvalsRequired: number }

    if (!approvalsRequired || approvalsRequired < 1) {
      return NextResponse.json(
        { success: false, error: 'approvalsRequired must be at least 1' },
        { status: 400 }
      )
    }

    // Use direct REST API — SDK does not expose wallet.update()
    const response = await fetch(
      `${BITGO_API}/${coin}/wallet/${defaultWalletId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approvalsRequired }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error ?? `BitGo API error: ${response.status}`)
    }

    return NextResponse.json({
      success: true,
      approvalsRequired: data.approvalsRequired,
      message: `Wallet now requires ${data.approvalsRequired} approval(s) before any transaction executes`,
    })
  } catch (error: unknown) {
    console.error('[BitGo] Policy update error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update policy' },
      { status: 500 }
    )
  }
}