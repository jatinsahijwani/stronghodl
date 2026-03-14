'use client'

import { PrivacyBadge } from '@/components/cards/privacy-badge'
import { ArrowUpRight, ArrowDownLeft, ArrowRightLeft, Search, Download } from 'lucide-react'

const transactions = [
  {
    id: '1',
    type: 'withdrawal',
    description: 'Transfer to development fund',
    from: '0x742d...3dBb',
    to: '0x521f...8aEe',
    amount: '100 ETH',
    amountUSD: '$380,000',
    date: '2 hours ago',
    status: 'confirmed',
    privacy: 'encrypted' as const,
    txHash: '0xabc123...def456',
  },
  {
    id: '2',
    type: 'deposit',
    description: 'Funding from treasury partner',
    from: 'External',
    to: '0x742d...3dBb',
    amount: '50,000 USDC',
    amountUSD: '$50,000',
    date: '5 hours ago',
    status: 'confirmed',
    privacy: 'zk-verified' as const,
    txHash: '0xdef789...abc123',
  },
  {
    id: '3',
    type: 'swap',
    description: 'DAI to ETH swap',
    from: '0x742d...3dBb',
    to: '0x834b...2cFf',
    amount: '9.5 ETH',
    amountUSD: '$36,100',
    date: '1 day ago',
    status: 'confirmed',
    privacy: 'private' as const,
    txHash: '0xghi456...jkl789',
  },
  {
    id: '4',
    type: 'withdrawal',
    description: 'Operational expenses',
    from: '0x742d...3dBb',
    to: '0x129e...7bAa',
    amount: '500,000 GOV',
    amountUSD: '$325,000',
    date: '2 days ago',
    status: 'confirmed',
    privacy: 'encrypted' as const,
    txHash: '0xjkl012...mno345',
  },
  {
    id: '5',
    type: 'deposit',
    description: 'Yield farming rewards',
    from: 'Contract',
    to: '0x742d...3dBb',
    amount: '2.5 ETH',
    amountUSD: '$9,500',
    date: '3 days ago',
    status: 'confirmed',
    privacy: 'private' as const,
    txHash: '0xmno678...pqr901',
  },
  {
    id: '6',
    type: 'swap',
    description: 'USDT to USDC conversion',
    from: '0x742d...3dBb',
    to: 'Contract',
    amount: '150,000 USDC',
    amountUSD: '$150,000',
    date: '5 days ago',
    status: 'confirmed',
    privacy: 'zk-verified' as const,
    txHash: '0xpqr234...stu567',
  },
]

const transactionStats = [
  { label: 'Total Transactions', value: '284', change: '+12%' },
  { label: 'Total Volume', value: '$2.4M', change: '+8%' },
  { label: 'Avg Transaction', value: '$8,450', change: '-2%' },
  { label: 'Pending Transactions', value: '2', change: '0%' },
]

export default function TransactionsPage() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'withdrawal':
        return <ArrowUpRight className="w-5 h-5" />
      case 'deposit':
        return <ArrowDownLeft className="w-5 h-5" />
      case 'swap':
        return <ArrowRightLeft className="w-5 h-5" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'withdrawal':
        return 'text-destructive bg-destructive/10'
      case 'deposit':
        return 'text-success bg-success/10'
      case 'swap':
        return 'text-primary bg-primary/10'
      default:
        return ''
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Transactions</h1>
          <p className="text-muted-foreground">Complete transaction history and details</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm font-medium text-foreground hover:bg-card/70 transition-colors">
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {transactionStats.map((stat, idx) => (
          <div key={idx} className="glass rounded-xl p-6">
            <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <span className={stat.change.includes('+') ? 'text-success text-sm' : 'text-destructive text-sm'}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="glass rounded-xl p-4 flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by hash, address, or amount..."
            className="w-full bg-muted/20 border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted/20 transition-colors">
          All Types
        </button>
      </div>

      {/* Transactions Table */}
      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Privacy</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Hash</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div className={`p-2 rounded-lg w-fit ${getTypeColor(tx.type)}`}>
                    {getTypeIcon(tx.type)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.from} → {tx.to}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{tx.amount}</p>
                    <p className="text-xs text-muted-foreground">{tx.amountUSD}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{tx.date}</td>
                <td className="px-6 py-4">
                  <PrivacyBadge level={tx.privacy} showLabel={false} />
                </td>
                <td className="px-6 py-4">
                  <code className="text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    {tx.txHash}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing 1-6 of 284 transactions</p>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors disabled:opacity-50">
            Previous
          </button>
          {[1, 2, 3, '...', 45, 46].map((page, idx) => (
            <button
              key={idx}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                page === 1
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-foreground hover:bg-muted/20'
              }`}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted/20 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
