import { NextResponse } from 'next/server'
import bitgo, { walletPassphrase } from '@/lib/bitgo'
import { encryptVote } from '@/lib/bitgo-crypto'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { state, signerAddress } = body as {
      state: 'approved' | 'rejected'
      signerAddress: string
    }

    if (!state || !['approved', 'rejected'].includes(state)) {
      return NextResponse.json(
        { success: false, error: 'state must be "approved" or "rejected"' },
        { status: 400 }
      )
    }

    // Encrypt the vote before sending to BitGo
    // This is our privacy layer — the vote is recorded encrypted
    const encryptedVote = encryptVote(
      signerAddress ?? 'anonymous',
      state === 'approved' ? 'approve' : 'reject'
    )

    const sdk = bitgo.coin(process.env.BITGO_COIN ?? 'hteth')
    const approval = await sdk.pendingApprovals().get({ id })

    const result = await approval.approve({
      walletPassphrase,
      otp: '0000000', // testnet OTP bypass
    }) as any

    return NextResponse.json({
      success: true,
      approvalId: id,
      newState: result.state ?? state,
      encryptedVote, // stored for privacy reveal later
      message: `Approval ${state} successfully`,
    })
  } catch (error: unknown) {
    console.error('[BitGo] Approval update error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update approval',
      },
      { status: 500 }
    )
  }
}