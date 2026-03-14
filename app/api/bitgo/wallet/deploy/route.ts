import { NextResponse } from 'next/server'
import bitgo, { coin, defaultWalletId, enterpriseId } from '@/lib/bitgo'

export async function GET() {
  // Check gas tank balance
  try {
    const response = await fetch(
      `https://app.bitgo-test.com/api/v2/${coin}/enterprise/${enterpriseId}/feeAddressBalance`,
      {
        headers: {
          Authorization: `Bearer ${process.env.BITGO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )
    const gasTank = await response.json()

    // Also get wallet deployment status
    const sdk = bitgo.coin(coin)
    const wallet = await sdk.wallets().get({ id: defaultWalletId })
    const walletData = wallet.toJSON() as any

    const isPendingDeployment =
      walletData.receiveAddress?.coinSpecific?.pendingDeployment ?? true

    return NextResponse.json({
      success: true,
      gasTank: {
        address: gasTank.feeAddress,
        balance: gasTank.balance,
        balanceString: gasTank.balanceString,
      },
      wallet: {
        address: walletData.receiveAddress?.address,
        pendingDeployment: isPendingDeployment,
        status: isPendingDeployment
          ? 'Send HTETH to the wallet address to trigger deployment'
          : 'Wallet is deployed and ready',
      },
    })
  } catch (error: unknown) {
    console.error('[BitGo] Gas tank / deploy check error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check deployment status',
      },
      { status: 500 }
    )
  }
}