import { NextResponse } from 'next/server'
import bitgo, { coin, defaultWalletId } from '@/lib/bitgo'

export async function GET() {
  try {
    const sdk = bitgo.coin(coin)

    const approvalsResponse = await sdk.pendingApprovals().list({
      walletId: defaultWalletId,
    }) as any

    const approvals = (approvalsResponse.pendingApprovals ?? []).map((approval: any) => ({
      id: approval.id,
      state: approval.state,
      creator: approval.creator,
      createDate: approval.createDate,
      approvalsRequired: approval.approvalsRequired ?? 1,
      approvers: approval.approvers ?? {},
      resolvers: approval.resolvers ?? [],
      info: {
        type: approval.info?.type,
        transactionRequest: approval.info?.transactionRequest
          ? {
              destinationAddress: approval.info.transactionRequest.destinationAddress,
              value: approval.info.transactionRequest.value,
              coin: approval.info.transactionRequest.coin,
              comment: approval.info.transactionRequest.comment ?? null,
            }
          : null,
      },
    }))

    return NextResponse.json({
      success: true,
      approvals,
      total: approvals.length,
    })
  } catch (error: unknown) {
    console.error('[BitGo] Approvals fetch error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch approvals',
      },
      { status: 500 }
    )
  }
}