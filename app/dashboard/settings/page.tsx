'use client'

import { Bell, Lock, Eye, EyeOff, Save } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    transactionAlerts: true,
    proposalUpdates: true,
    approvalRequests: true,
    securityAlerts: true,
    weeklyDigest: false,
    emailNotifications: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    hideTransactionAmounts: false,
    encryptVotes: true,
    anonVoting: false,
    hideSignerAddress: false,
  })

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage preferences and account settings</p>
      </div>

      {/* Account Settings */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Connected Wallet</label>
            <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-border">
              <div>
                <p className="font-mono text-sm text-foreground">0x742d35Cc6634C0532925a3b844Bc9e7595f3dBb</p>
                <p className="text-xs text-muted-foreground mt-1">Connected for 45 days</p>
              </div>
              <button className="px-4 py-2 border border-destructive text-destructive rounded-lg text-sm font-medium hover:bg-destructive/10 transition-colors">
                Disconnect
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Primary Email</label>
            <input
              type="email"
              value="governance@example.com"
              className="w-full bg-muted/10 border border-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Display Name</label>
            <input
              type="text"
              value="Treasury Lead"
              className="w-full bg-muted/10 border border-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
        </div>

        <div className="space-y-3">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-border/50 hover:border-border cursor-pointer group">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {key === 'transactionAlerts'
                    ? 'Transaction Alerts'
                    : key === 'proposalUpdates'
                    ? 'Proposal Updates'
                    : key === 'approvalRequests'
                    ? 'Approval Requests'
                    : key === 'securityAlerts'
                    ? 'Security Alerts'
                    : key === 'weeklyDigest'
                    ? 'Weekly Digest'
                    : 'Email Notifications'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {key === 'transactionAlerts'
                    ? 'Get notified about all transactions'
                    : key === 'proposalUpdates'
                    ? 'Receive updates on new proposals'
                    : key === 'approvalRequests'
                    ? 'Alert when your signature is needed'
                    : key === 'securityAlerts'
                    ? 'Critical security notifications'
                    : key === 'weeklyDigest'
                    ? 'Summary of weekly activity'
                    : 'Receive notifications via email'}
                </p>
              </div>
              <div className="relative w-12 h-7 bg-muted/50 rounded-full cursor-pointer group-hover:bg-muted transition-colors"
                onClick={() => setNotificationSettings(prev => ({
                  ...prev,
                  [key]: !prev[key as keyof typeof notificationSettings]
                }))}>
                <div
                  className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-foreground transition-transform ${
                    value ? 'translate-x-5 bg-success' : ''
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Privacy & Encryption</h2>
        </div>

        <div className="space-y-3">
          {Object.entries(privacySettings).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-border/50 hover:border-border cursor-pointer group">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {key === 'hideTransactionAmounts'
                    ? 'Hide Transaction Amounts'
                    : key === 'encryptVotes'
                    ? 'Encrypt Votes'
                    : key === 'anonVoting'
                    ? 'Anonymous Voting'
                    : 'Hide Signer Address'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {key === 'hideTransactionAmounts'
                    ? 'Display transaction amounts as masked values'
                    : key === 'encryptVotes'
                    ? 'Use zero-knowledge proofs for voting'
                    : key === 'anonVoting'
                    ? 'Hide voting history from public'
                    : 'Keep your signer address private'}
                </p>
              </div>
              <div className="relative w-12 h-7 bg-muted/50 rounded-full cursor-pointer group-hover:bg-muted transition-colors"
                onClick={() => setPrivacySettings(prev => ({
                  ...prev,
                  [key]: !prev[key as keyof typeof privacySettings]
                }))}>
                <div
                  className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-foreground transition-transform ${
                    value ? 'translate-x-5 bg-primary' : ''
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Security</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Two-Factor Authentication</label>
            <div className="flex items-center justify-between p-4 bg-success/10 border border-success/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-success">Enabled</p>
                <p className="text-xs text-success/80 mt-1">Using authenticator app</p>
              </div>
              <button className="px-4 py-2 border border-success text-success rounded-lg text-sm font-medium hover:bg-success/10 transition-colors">
                Manage
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Session Timeout</label>
            <select className="w-full bg-muted/10 border border-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>15 minutes (Recommended)</option>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>Never</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Active Sessions</label>
            <div className="space-y-2">
              {[
                { device: 'Chrome on MacBook Pro', location: 'San Francisco, CA', lastActive: 'Now' },
                { device: 'Safari on iPhone', location: 'San Francisco, CA', lastActive: '2 hours ago' },
              ].map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-border/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{session.device}</p>
                    <p className="text-xs text-muted-foreground mt-1">{session.location} • Last active: {session.lastActive}</p>
                  </div>
                  <button className="px-3 py-1.5 border border-border text-muted-foreground rounded text-xs font-medium hover:text-destructive hover:border-destructive transition-colors">
                    Sign Out
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass rounded-xl p-6 border border-destructive/30">
        <h2 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Export Data</p>
            <p className="text-sm text-muted-foreground mb-4">Download all your governance data</p>
            <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted/20 transition-colors">
              Export
            </button>
          </div>

          <div className="border-t border-destructive/30 pt-4">
            <p className="text-sm font-medium text-destructive mb-2">Revoke Access</p>
            <p className="text-sm text-muted-foreground mb-4">Permanently revoke access to this dashboard</p>
            <button className="px-4 py-2 bg-destructive/10 border border-destructive text-destructive rounded-lg text-sm font-medium hover:bg-destructive/20 transition-colors">
              Revoke Access
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-4">
        <button className="px-6 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted/20 transition-colors">
          Cancel
        </button>
        <button className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  )
}
