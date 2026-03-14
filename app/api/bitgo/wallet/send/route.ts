import { NextResponse } from 'next/server'
import { defaultWalletId, walletPassphrase } from '@/lib/bitgo'

const BITGO_API = 'https://app.bitgo-test.com/api/v2'
const ACCESS_TOKEN = process.env.BITGO_ACCESS_TOKEN!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { address, amount, comment } = body as {
      address: string
      amount: string
      comment?: string
    }

    if (!address || !amount) {
      return NextResponse.json(
        { success: false, error: 'address and amount are required' },
        { status: 400 }
      )
    }

    // TSS/MPC wallets use /txrequests — no coin in URL
    const response = await fetch(
      `${BITGO_API}/wallet/${defaultWalletId}/txrequests`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'transfer',
          intent: {
            intentType: 'payment',
            recipients: [
              {
                address: { address },
                amount: { value: String(amount), symbol: 'hteth' },
              },
            ],
            comment: comment ?? 'StrongHodl governance transaction',
          },
          walletPassphrase,
        }),
      }
    )

    const data = await response.json()
    console.log('[BitGo] TxRequest result:', JSON.stringify(data, null, 2))

    if (!response.ok) {
      throw new Error(data.error ?? data.message ?? `BitGo error: ${response.status}`)
    }

    const isPendingApproval = data.state === 'pendingApproval' || data.state === 'pendingDelivery'

    return NextResponse.json({
      success: true,
      txRequestId: data.txRequestId,
      state: data.state,
      status: isPendingApproval ? 'pendingApproval' : 'sent',
      message: isPendingApproval
        ? 'Transaction request created — awaiting signing'
        : 'Transaction request submitted',
    })
  } catch (error: unknown) {
    console.error('[BitGo] Send error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send transaction',
      },
      { status: 500 }
    )
  }
}