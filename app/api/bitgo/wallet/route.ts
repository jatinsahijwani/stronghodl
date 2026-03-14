import { NextResponse } from 'next/server'
import bitgo, { coin, defaultWalletId } from '@/lib/bitgo'

export async function GET() {
  try {
    const sdk = bitgo.coin(coin)
    const wallet = await sdk.wallets().get({ id: defaultWalletId })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const walletData = wallet.toJSON() as any

    return NextResponse.json({
      success: true,
      wallet: {
        id: walletData.id,
        label: walletData.label,
        coin: walletData.coin,
        balance: walletData.balance ?? 0,
        confirmedBalance: walletData.confirmedBalance ?? 0,
        spendableBalance: walletData.spendableBalance ?? 0,
        receiveAddress: walletData.receiveAddress,
        approvalsRequired: walletData.approvalsRequired,
        status: {
          pendingDeployment: walletData.receiveAddress?.coinSpecific?.pendingDeployment ?? false,
          pendingChainInitialization: walletData.receiveAddress?.coinSpecific?.pendingChainInitialization ?? false,
        }
      },
    })
  } catch (error: unknown) {
    console.error('[BitGo] Wallet fetch error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch wallet',
      },
      { status: 500 }
    )
  }
}