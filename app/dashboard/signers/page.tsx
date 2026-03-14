'use client'

import { PrivacyBadge } from '@/components/cards/privacy-badge'
import { Plus, Trash2, Edit2, CheckCircle2, Clock } from 'lucide-react'

const signers = [
  {
    id: '1',
    address: '0x742d...3dBb',
    role: 'Treasury Lead',
    permissions: 'Full',
    signedCount: 342,
    joinedDate: 'Jan 15, 2024',
    status: 'active',
    verified: true,
  },
  {
    id: '2',
    address: '0x521f...8aEe',
    role: 'Security Lead',
    permissions: 'Restricted',
    signedCount: 289,
    joinedDate: 'Feb 02, 2024',
    status: 'active',
    verified: true,
  },
  {
    id: '3',
    address: '0x834b...2cFf',
    role: 'Development Lead',
    permissions: 'Full',
    signedCount: 156,
    joinedDate: 'Mar 10, 2024',
    status: 'active',
    verified: true,
  },
  {
    id: '4',
    address: '0x129e...7bAa',
    role: 'Community Manager',
    permissions: 'Limited',
    signedCount: 89,
    joinedDate: 'Apr 05, 2024',
    status: 'active',
    verified: true,
  },
  {
    id: '5',
    address: '0x456e...1dCc',
    role: 'Compliance Officer',
    permissions: 'Restricted',
    signedCount: 234,
    joinedDate: 'Jan 28, 2024',
    status: 'active',
    verified: true,
  },
  {
    id: '6',
    address: '0x789f...9eFf',
    role: 'Operations Manager',
    permissions: 'Full',
    signedCount: 198,
    joinedDate: 'Feb 14, 2024',
    status: 'pending',
    verified: false,
  },
  {
    id: '7',
    address: '0xabc1...2aBc',
    role: 'Advisor',
    permissions: 'Limited',
    signedCount: 45,
    joinedDate: 'Mar 22, 2024',
    status: 'active',
    verified: true,
  },
  {
    id: '8',
    address: '0xdef4...5dEf',
    role: 'External Auditor',
    permissions: 'View Only',
    signedCount: 12,
    joinedDate: 'Apr 18, 2024',
    status: 'active',
    verified: true,
  },
]

const signerStats = [
  { label: 'Total Signers', value: '12', sublabel: '8 active, 4 pending' },
  { label: 'Verified', value: '11', sublabel: '91.7%' },
  { label: 'Avg Signatures', value: '178', sublabel: 'per signer' },
  { label: 'Last Updated', value: '2h ago', sublabel: 'New approval added' },
]

export default function SignersPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Signers</h1>
          <p className="text-muted-foreground">Manage governance protocol signers and permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Add Signer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {signerStats.map((stat, idx) => (
          <div key={idx} className="glass rounded-xl p-6">
            <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-3xl font-semibold text-foreground mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
          </div>
        ))}
      </div>

      {/* Signers Table */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">All Signers</h2>
          <p className="text-sm text-muted-foreground">Active governance signers and their roles</p>
        </div>
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Address</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Permissions</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Signatures</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {signers.map((signer) => (
                <tr key={signer.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-foreground">{signer.address}</code>
                      {signer.verified && (
                        <PrivacyBadge level="zk-verified" showLabel={false} />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{signer.role}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      signer.permissions === 'Full'
                        ? 'bg-success/10 text-success'
                        : signer.permissions === 'Restricted'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-muted/10 text-muted-foreground'
                    }`}>
                      {signer.permissions}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{signer.signedCount}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{signer.joinedDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {signer.status === 'active' ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <Clock className="w-4 h-4 text-warning" />
                      )}
                      <span className={`text-xs font-medium ${
                        signer.status === 'active' ? 'text-success' : 'text-warning'
                      }`}>
                        {signer.status === 'active' ? 'Active' : 'Pending'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted/30 rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-2 hover:bg-destructive/10 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Levels */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Permission Levels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'Full',
              color: 'bg-success/10 border-success/30',
              permissions: ['Execute Transactions', 'Create Proposals', 'Manage Signers', 'Update Policies'],
            },
            {
              name: 'Restricted',
              color: 'bg-warning/10 border-warning/30',
              permissions: ['Execute Transactions', 'Create Proposals', 'View History', 'Sign Approvals'],
            },
            {
              name: 'Limited',
              color: 'bg-primary/10 border-primary/30',
              permissions: ['View Proposals', 'View Treasury', 'Sign Approvals', 'Submit Feedback'],
            },
            {
              name: 'View Only',
              color: 'bg-muted/10 border-muted/30',
              permissions: ['View Proposals', 'View Treasury', 'View Signers', 'View History'],
            },
          ].map((level, idx) => (
            <div key={idx} className={`glass rounded-xl p-4 border ${level.color}`}>
              <p className="font-semibold text-foreground mb-3">{level.name}</p>
              <ul className="space-y-1.5">
                {level.permissions.map((perm, pidx) => (
                  <li key={pidx} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    {perm}
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
