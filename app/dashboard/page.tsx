'use client'

import { StatCard } from '@/components/cards/stat-card'
import { GovernanceCard } from '@/components/cards/governance-card'
import { PrivacyBadge } from '@/components/cards/privacy-badge'
import {
  Wallet,
  FileText,
  CheckCircle2,
  Users,
  TrendingUp,
  ArrowUpRight,
  AlertCircle,
} from 'lucide-react'

const mockProposals = [
  {
    id: '1',
    title: 'Treasury Allocation Q2 2024',
    description: 'Approve budget allocation for development team',
    status: 'active' as const,
    progress: 65,
    votes: '342/500',
  },
  {
    id: '2',
    title: 'Security Upgrade Implementation',
    description: 'Multi-sig upgrade with enhanced privacy features',
    status: 'pending' as const,
    votes: '0/500',
  },
  {
    id: '3',
    title: 'New Signer Onboarding',
    description: 'Add 3 new signers to governance council',
    status: 'completed' as const,
    progress: 100,
    votes: '489/500',
  },
]

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your governance protocol activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Assets Under Management"
          value="$2.4M"
          icon={Wallet}
          change={{ value: 12, positive: true }}
          color="primary"
        />
        <StatCard
          label="Active Proposals"
          value="8"
          icon={FileText}
          change={{ value: 3, positive: true }}
          color="success"
        />
        <StatCard
          label="Approval Rate"
          value="94.2%"
          icon={CheckCircle2}
          change={{ value: 2, positive: true }}
          color="primary"
        />
        <StatCard
          label="Active Signers"
          value="12"
          icon={Users}
          description="ZK Verified"
          color="success"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Proposals */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">Active Proposals</h2>
            <p className="text-sm text-muted-foreground">Latest governance updates</p>
          </div>
          <div className="space-y-3">
            {mockProposals.map((proposal) => (
              <GovernanceCard
                key={proposal.id}
                title={proposal.title}
                description={proposal.description}
                status={proposal.status}
                progress={proposal.progress}
                footer={proposal.votes}
              />
            ))}
          </div>
        </div>

        {/* Security Summary */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Security Status</h3>
            <PrivacyBadge level="zk-verified" showLabel={false} />
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-success mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">All transactions encrypted</p>
                <p className="text-xs text-muted-foreground">End-to-end with ZK proofs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-success mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Multi-sig verified</p>
                <p className="text-xs text-muted-foreground">12/15 signers active</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-warning mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">2 pending approvals</p>
                <p className="text-xs text-muted-foreground">Awaiting council vote</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <button className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium text-sm transition-colors">
              View Audit Report
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
          <p className="text-sm text-muted-foreground">Last 24 hours activity</p>
        </div>
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Hash</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Privacy</th>
              </tr>
            </thead>
            <tbody>
              {[
                { hash: '0x742d...3dBb', type: 'Governance', amount: '1000 GOV', status: 'confirmed', privacy: 'encrypted' },
                { hash: '0x521f...8aEe', type: 'Treasury', amount: '50 ETH', status: 'confirmed', privacy: 'zk-verified' },
                { hash: '0x834b...2cFf', type: 'Approval', amount: 'N/A', status: 'pending', privacy: 'private' },
                { hash: '0x129e...7bAa', type: 'Governance', amount: '500 GOV', status: 'confirmed', privacy: 'encrypted' },
              ].map((tx, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-foreground">{tx.hash}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{tx.type}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      tx.status === 'confirmed'
                        ? 'bg-success/10 text-success'
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {tx.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </td>
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
