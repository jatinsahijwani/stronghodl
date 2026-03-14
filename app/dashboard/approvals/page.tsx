'use client'

import { GovernanceCard } from '@/components/cards/governance-card'
import { PrivacyBadge } from '@/components/cards/privacy-badge'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'

const approvals = [
  {
    id: '1',
    title: 'Executive Fund Transfer',
    description: 'Transfer 100 ETH to development treasury fund',
    status: 'pending' as const,
    requiredSignatures: 8,
    currentSignatures: 5,
    privacy: 'encrypted' as const,
  },
  {
    id: '2',
    title: 'New Contract Deployment',
    description: 'Deploy v2.1 governance smart contract to mainnet',
    status: 'pending' as const,
    requiredSignatures: 8,
    currentSignatures: 7,
    privacy: 'zk-verified' as const,
  },
  {
    id: '3',
    title: 'Signer Authority Update',
    description: 'Update signing permissions for newly onboarded signers',
    status: 'completed' as const,
    requiredSignatures: 5,
    currentSignatures: 5,
    privacy: 'private' as const,
  },
  {
    id: '4',
    title: 'Emergency Pause Authorization',
    description: 'Authorize emergency protocol pause during security audit',
    status: 'failed' as const,
    requiredSignatures: 8,
    currentSignatures: 3,
    privacy: 'encrypted' as const,
  },
  {
    id: '5',
    title: 'Budget Allocation Approval',
    description: 'Approve quarterly budget for operational expenses',
    status: 'active' as const,
    requiredSignatures: 6,
    currentSignatures: 4,
    privacy: 'private' as const,
  },
  {
    id: '6',
    title: 'Partnership Agreement',
    description: 'Execute agreement with strategic governance partner',
    status: 'pending' as const,
    requiredSignatures: 7,
    currentSignatures: 6,
    privacy: 'zk-verified' as const,
  },
]

const pendingSignatures = [
  { signer: '0x742d...3dBb', role: 'Treasury Lead', status: 'signed', date: '2 hours ago' },
  { signer: '0x521f...8aEe', role: 'Security Lead', status: 'pending', date: null },
  { signer: '0x834b...2cFf', role: 'Dev Lead', status: 'signed', date: '1 hour ago' },
  { signer: '0x129e...7bAa', role: 'Community Lead', status: 'pending', date: null },
  { signer: '0x456e...1dCc', role: 'Compliance', status: 'signed', date: '30 min ago' },
  { signer: '0x789f...9eFf', role: 'Operations', status: 'pending', date: null },
]

export default function ApprovalsPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Approvals</h1>
        <p className="text-muted-foreground">Multi-signature approval management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">Pending Approvals</p>
              <p className="text-3xl font-semibold text-foreground">3</p>
              <p className="text-xs text-warning mt-1">Awaiting signatures</p>
            </div>
            <div className="p-3 rounded-lg bg-warning/10">
              <Clock className="w-6 h-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">Approved This Week</p>
              <p className="text-3xl font-semibold text-foreground">8</p>
              <p className="text-xs text-success mt-1">100% completion rate</p>
            </div>
            <div className="p-3 rounded-lg bg-success/10">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">Avg Signing Time</p>
              <p className="text-3xl font-semibold text-foreground">2.4h</p>
              <p className="text-xs text-primary mt-1">Well within SLA</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Approvals Grid */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">All Approvals</h2>
          <p className="text-sm text-muted-foreground">Current approval requests and their status</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {approvals.map((approval) => (
            <div key={approval.id}>
              <GovernanceCard
                title={approval.title}
                description={approval.description}
                status={approval.status}
                progress={Math.round((approval.currentSignatures / approval.requiredSignatures) * 100)}
                footer={`${approval.currentSignatures}/${approval.requiredSignatures} signatures`}
                icon={CheckCircle2}
              />
              <div className="mt-2 flex items-center justify-between px-1">
                <PrivacyBadge level={approval.privacy} showLabel={false} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signer Status */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Current Signers</h2>
          <p className="text-sm text-muted-foreground">Signing authority and status</p>
        </div>
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Signer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Last Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingSignatures.map((sig, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-foreground">{sig.signer}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{sig.role}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      sig.status === 'signed'
                        ? 'bg-success/10 text-success'
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {sig.status === 'signed' ? 'Signed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{sig.date || 'Awaiting action'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval Flow */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Approval Flow</h2>
          <p className="text-sm text-muted-foreground">Standard approval process timeline</p>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            {[
              { label: 'Submitted', completed: true },
              { label: 'Under Review', completed: true },
              { label: 'Multi-Sig', completed: false },
              { label: 'Execution', completed: false },
            ].map((step, idx, arr) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                  step.completed
                    ? 'bg-success text-background'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.completed ? '✓' : idx + 1}
                </div>
                <p className="text-sm font-medium text-foreground text-center">{step.label}</p>
                {idx < arr.length - 1 && (
                  <div className={`h-1 w-full -mx-2 mt-3 mb-3 ${
                    step.completed ? 'bg-success' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
