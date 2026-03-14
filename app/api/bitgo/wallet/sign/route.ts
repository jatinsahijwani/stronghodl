import { NextResponse } from 'next/server'
import { defaultWalletId, walletPassphrase } from '@/lib/bitgo'

const BITGO_API = 'https://app.bitgo-test.com/api/v2'
const ACCESS_TOKEN = process.env.BITGO_ACCESS_TOKEN!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { txRequestId } = body as { txRequestId: string }

    if (!txRequestId) {
      return NextResponse.json(
        { success: false, error: 'txRequestId is required' },
        { status: 400 }
      )
    }

    // Step 1: Ask BitGo to co-sign the transaction
    // resource = 'transactions', resourceIndex = 0
    const signRes = await fetch(
      `${BITGO_API}/wallet/${defaultWalletId}/txrequests/${txRequestId}/transactions/0/sign`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletPassphrase,
        }),
      }
    )

    const signData = await signRes.json()
    console.log('[BitGo] Sign result:', JSON.stringify(signData, null, 2))

    if (!signRes.ok) {
      throw new Error(signData.error ?? signData.message ?? `Sign failed: ${signRes.status}`)
    }

    // Step 2: Send the signed transaction request
    const sendRes = await fetch(
      `${BITGO_API}/wallet/${defaultWalletId}/txrequests/${txRequestId}/send`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const sendData = await sendRes.json()
    console.log('[BitGo] Send result:', JSON.stringify(sendData, null, 2))

    if (!sendRes.ok) {
      throw new Error(sendData.error ?? sendData.message ?? `Send failed: ${sendRes.status}`)
    }

    return NextResponse.json({
      success: true,
      txRequestId,
      state: sendData.state,
      txid: sendData.transactions?.[0]?.txid ?? null,
      message: 'Transaction signed and broadcast successfully',
    })
  } catch (error: unknown) {
    console.error('[BitGo] Sign error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to sign transaction',
      },
      { status: 500 }
    )
  }
}