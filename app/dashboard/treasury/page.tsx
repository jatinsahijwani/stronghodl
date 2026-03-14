'use client'

import { StatCard } from '@/components/cards/stat-card'
import { PrivacyBadge } from '@/components/cards/privacy-badge'
import { Wallet, TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react'

const treasuryAssets = [
  { symbol: 'ETH', name: 'Ethereum', balance: '250.5', value: '$950,000', allocation: '40%' },
  { symbol: 'USDC', name: 'USD Coin', balance: '500,000', value: '$500,000', allocation: '21%' },
  { symbol: 'GOV', name: 'Governance Token', balance: '1,000,000', value: '$650,000', allocation: '27%' },
  { symbol: 'DAI', name: 'DAI Stablecoin', balance: '150,000', value: '$150,000', allocation: '6%' },
  { symbol: 'USDT', name: 'Tether', balance: '100,000', value: '$100,000', allocation: '4%' },
]

const treasuryTransactions = [
  { id: '1', type: 'Withdrawal', asset: '100 ETH', recipient: '0x742d...3dBb', date: '2 hours ago', status: 'confirmed', privacy: 'encrypted' },
  { id: '2', type: 'Deposit', asset: '50,000 USDC', from: '0x521f...8aEe', date: '5 hours ago', status: 'confirmed', privacy: 'zk-verified' },
  { id: '3', type: 'Swap', asset: '10,000 DAI → 9.5 ETH', date: '1 day ago', status: 'confirmed', privacy: 'private' },
  { id: '4', type: 'Withdrawal', asset: '500,000 GOV', recipient: '0x834b...2cFf', date: '2 days ago', status: 'confirmed', privacy: 'encrypted' },
]

export default function TreasuryPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Treasury</h1>
        <p className="text-muted-foreground">Manage and monitor all protocol assets</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Treasury Value"
          value="$2.35M"
          icon={Wallet}
          change={{ value: 8, positive: true }}
          color="primary"
        />
        <StatCard
          label="Monthly Inflows"
          value="$450K"
          icon={ArrowUpRight}
          change={{ value: 12, positive: true }}
          color="success"
        />
        <StatCard
          label="Monthly Outflows"
          value="$180K"
          icon={ArrowDownRight}
          color="warning"
        />
        <StatCard
          label="Diversification Score"
          value="8.4/10"
          icon={TrendingUp}
          description="Well balanced"
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assets Breakdown */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">Asset Holdings</h2>
            <p className="text-sm text-muted-foreground">Current treasury composition</p>
          </div>
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {treasuryAssets.map((asset, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-foreground">{asset.symbol}</p>
                        <p className="text-xs text-muted-foreground">{asset.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-foreground">{asset.balance}</td>
                    <td className="px-6 py-4 text-sm text-foreground font-semibold">{asset.value}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: asset.allocation }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground w-12">{asset.allocation}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Allocation Chart */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-6">Distribution</h3>
          <div className="space-y-4">
            {treasuryAssets.map((asset, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-foreground">{asset.symbol}</span>
                  <span className="text-sm font-medium text-muted-foreground">{asset.allocation}</span>
                </div>
                <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: asset.allocation }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Treasury Transactions</h2>
          <p className="text-sm text-muted-foreground">Latest treasury activity</p>
        </div>
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Address</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Privacy</th>
              </tr>
            </thead>
            <tbody>
              {treasuryTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      tx.type === 'Withdrawal'
                        ? 'bg-destructive/10 text-destructive'
                        : tx.type === 'Deposit'
                        ? 'bg-success/10 text-success'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{tx.asset}</td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{tx.recipient || tx.from}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{tx.date}</td>
                  <td className="px-6 py-4">
                    <PrivacyBadge level={tx.privacy as any} showLabel={false} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
