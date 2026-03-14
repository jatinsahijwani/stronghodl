'use client'

import { GovernanceCard } from '@/components/cards/governance-card'
import { PrivacyBadge } from '@/components/cards/privacy-badge'
import { FileText, Plus, Filter } from 'lucide-react'

const proposals = [
  {
    id: '1',
    title: 'Treasury Allocation Q2 2024',
    description: 'Approve $500K budget allocation for development and marketing initiatives',
    status: 'active' as const,
    progress: 65,
    author: '0x742d...3dBb',
    votes: '342/500',
    privacyLevel: 'encrypted' as const,
    createdAt: '3 days ago',
  },
  {
    id: '2',
    title: 'Security Upgrade v2.1',
    description: 'Multi-sig upgrade implementation with enhanced privacy features and ZK proofs',
    status: 'pending' as const,
    progress: 0,
    author: '0x521f...8aEe',
    votes: '0/500',
    privacyLevel: 'zk-verified' as const,
    createdAt: '1 day ago',
  },
  {
    id: '3',
    title: 'New Signer Onboarding',
    description: 'Add 3 new council members with full signing authority',
    status: 'completed' as const,
    progress: 100,
    author: '0x834b...2cFf',
    votes: '489/500',
    privacyLevel: 'private' as const,
    createdAt: '1 week ago',
  },
  {
    id: '4',
    title: 'Fee Structure Revision',
    description: 'Reduce operational fees from 0.5% to 0.25% annually',
    status: 'active' as const,
    progress: 42,
    author: '0x129e...7bAa',
    votes: '210/500',
    privacyLevel: 'encrypted' as const,
    createdAt: '2 days ago',
  },
  {
    id: '5',
    title: 'Strategic Partnership',
    description: 'Establish governance partnership with leading protocol',
    status: 'pending' as const,
    progress: 0,
    author: '0x742d...3dBb',
    votes: '0/500',
    privacyLevel: 'private' as const,
    createdAt: '12 hours ago',
  },
  {
    id: '6',
    title: 'Emergency Protocol Pause',
    description: 'Emergency measure to pause all transactions during security audit',
    status: 'failed' as const,
    progress: 0,
    author: '0x521f...8aEe',
    votes: '245/500',
    privacyLevel: 'zk-verified' as const,
    createdAt: '2 weeks ago',
  },
]

export default function ProposalsPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Proposals</h1>
          <p className="text-muted-foreground">Create and vote on governance proposals</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Create Proposal
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm font-medium text-foreground hover:bg-card/70 transition-colors">
          <Filter className="w-4 h-4" />
          All Proposals
        </button>
        <button className="px-4 py-2 glass rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card/70 transition-colors">
          Active
        </button>
        <button className="px-4 py-2 glass rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card/70 transition-colors">
          Pending
        </button>
        <button className="px-4 py-2 glass rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card/70 transition-colors">
          Completed
        </button>
      </div>

      {/* Proposals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="group">
            <GovernanceCard
              title={proposal.title}
              description={proposal.description}
              status={proposal.status}
              progress={proposal.progress}
              footer={proposal.votes}
              icon={FileText}
            />
            <div className="mt-2 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono">{proposal.author}</span>
                <PrivacyBadge level={proposal.privacyLevel} showLabel={false} />
              </div>
              <span className="text-xs text-muted-foreground">{proposal.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Proposal Details Section */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Proposal Details</h2>
        <div className="glass rounded-xl p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Total Proposals</p>
                <p className="text-3xl font-bold text-foreground">{proposals.length}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Active Vote</p>
                <p className="text-3xl font-bold text-foreground">{proposals.filter(p => p.status === 'active').length}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Approval Rate</p>
                <p className="text-3xl font-bold text-success">94.2%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Avg Participation</p>
                <p className="text-3xl font-bold text-primary">82.5%</p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-semibold text-foreground mb-4">Voting Timeline</h3>
              <div className="space-y-3">
                {[
                  { stage: 'Discussion', progress: 100, color: 'bg-success' },
                  { stage: 'Voting', progress: 65, color: 'bg-primary' },
                  { stage: 'Execution', progress: 0, color: 'bg-muted' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-foreground">{item.stage}</span>
                      <span className="text-sm font-medium text-muted-foreground">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
