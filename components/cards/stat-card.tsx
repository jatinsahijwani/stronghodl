import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  change?: {
    value: number
    positive: boolean
  }
  description?: string
  color?: 'primary' | 'success' | 'warning' | 'destructive'
}

export function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  change,
  description,
  color = 'primary'
}: StatCardProps) {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/5',
    success: 'from-success/20 to-success/5',
    warning: 'from-warning/20 to-warning/5',
    destructive: 'from-destructive/20 to-destructive/5',
  }

  return (
    <div className="glass rounded-xl p-6 hover:bg-card/70 transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">{label}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      
      {change && (
        <div className="flex items-center gap-1 text-sm">
          <span className={change.positive ? 'text-success' : 'text-destructive'}>
            {change.positive ? '+' : '-'}{Math.abs(change.value)}%
          </span>
          <span className="text-muted-foreground">vs last period</span>
        </div>
      )}
    </div>
  )
}
