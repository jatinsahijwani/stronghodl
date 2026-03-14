import { Shield, Lock, Eye, EyeOff } from 'lucide-react'

type PrivacyLevel = 'zk-verified' | 'encrypted' | 'private' | 'public'

interface PrivacyBadgeProps {
  level: PrivacyLevel
  showLabel?: boolean
}

export function PrivacyBadge({ level, showLabel = true }: PrivacyBadgeProps) {
  const config = {
    'zk-verified': {
      icon: Shield,
      label: 'ZK Verified',
      color: 'bg-success/10 text-success border-success/30',
    },
    'encrypted': {
      icon: Lock,
      label: 'Encrypted',
      color: 'bg-primary/10 text-primary border-primary/30',
    },
    'private': {
      icon: EyeOff,
      label: 'Private',
      color: 'bg-accent/10 text-accent border-accent/30',
    },
    'public': {
      icon: Eye,
      label: 'Public',
      color: 'bg-muted/10 text-muted-foreground border-muted/30',
    },
  }

  const { icon: Icon, label, color } = config[level]

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      {showLabel && label}
    </div>
  )
}
