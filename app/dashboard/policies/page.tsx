'use client'

import { PrivacyBadge } from '@/components/cards/privacy-badge'
import { Shield, Plus, Edit2, ToggleLeft } from 'lucide-react'

const policies = [
  {
    id: '1',
    name: 'Maximum Transaction Limit',
    description: 'Enforce maximum transaction amount of $500K per transaction',
    status: 'active',
    lastUpdated: '2 days ago',
    priority: 'critical',
    affectedSigners: 8,
  },
  {
    id: '2',
    name: 'Multi-Sig Requirement',
    description: 'Require minimum 8 out of 12 signers for all transactions',
    status: 'active',
    lastUpdated: '1 week ago',
    priority: 'critical',
    affectedSigners: 12,
  },
  {
    id: '3',
    name: 'Time-Lock Policy',
    description: 'Implement 24-hour time-lock for large transfers',
    status: 'active',
    lastUpdated: '3 days ago',
    priority: 'high',
    affectedSigners: 12,
  },
  {
    id: '4',
    name: 'Daily Withdrawal Limit',
    description: 'Set daily withdrawal limit at $1M per wallet',
    status: 'active',
    lastUpdated: '1 day ago',
    priority: 'high',
    affectedSigners: 8,
  },
  {
    id: '5',
    name: 'Signer Attestation',
    description: 'Require periodic signer verification and re-attestation',
    status: 'pending',
    lastUpdated: '4 hours ago',
    priority: 'medium',
    affectedSigners: 10,
  },
  {
    id: '6',
    name: 'Emergency Pause Authority',
    description: 'Designate emergency pause authority for critical situations',
    status: 'inactive',
    lastUpdated: '2 weeks ago',
    priority: 'medium',
    affectedSigners: 3,
  },
]

const policyCategories = [
  {
    category: 'Transaction Limits',
    description: 'Control transaction amounts and frequencies',
    count: 3,
    active: true,
  },
  {
    category: 'Approval Requirements',
    description: 'Define multi-signature and approval thresholds',
    count: 2,
    active: true,
  },
  {
    category: 'Access Control',
    description: 'Manage signer permissions and access levels',
    count: 2,
    active: true,
  },
  {
    category: 'Security Measures',
    description: 'Implement time-locks, attestations, and audits',
    count: 2,
    active: true,
  },
]

export default function PoliciesPage() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-destructive/10 text-destructive'
      case 'high':
        return 'bg-warning/10 text-warning'
      case 'medium':
        return 'bg-primary/10 text-primary'
      case 'low':
        return 'bg-success/10 text-success'
      default:
        return 'bg-muted/10 text-muted-foreground'
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Policies</h1>
          <p className="text-muted-foreground">Define governance rules and security policies</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Create Policy
        </button>
      </div>

      {/* Policy Categories */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Policy Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {policyCategories.map((cat, idx) => (
            <div key={idx} className="glass rounded-xl p-6 hover:bg-card/70 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">{cat.category}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                </div>
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
              </div>
              <p className="text-2xl font-bold text-foreground">{cat.count}</p>
              <p className={`text-xs font-medium mt-2 ${cat.active ? 'text-success' : 'text-muted-foreground'}`}>
                {cat.active ? 'All Active' : 'Inactive'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* All Policies */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">All Policies</h2>
          <p className="text-sm text-muted-foreground">Governance and security policies</p>
        </div>
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Policy Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Affected Signers</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr key={policy.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{policy.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs">{policy.description}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityColor(
                      policy.priority
                    )}`}>
                      {policy.priority.charAt(0).toUpperCase() + policy.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      policy.status === 'active'
                        ? 'bg-success/10 text-success'
                        : policy.status === 'pending'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-muted/10 text-muted-foreground'
                    }`}>
                      {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{policy.affectedSigners}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{policy.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted/30 rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-2 hover:bg-muted/30 rounded transition-colors">
                        <ToggleLeft className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Policy Guidelines */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Security Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Best Practices',
              items: [
                'Implement multi-signature for all critical transactions',
                'Set transaction limits based on asset volatility',
                'Require time-locks for large transfers',
                'Conduct regular security audits',
              ],
            },
            {
              title: 'Compliance Requirements',
              items: [
                'Maintain detailed transaction logs',
                'Implement ZK proofs for sensitive data',
                'Require periodic signer attestation',
                'Monitor for suspicious activity patterns',
              ],
            },
          ].map((section, idx) => (
            <div key={idx} className="glass rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.items.map((item, iidx) => (
                  <li key={iidx} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
