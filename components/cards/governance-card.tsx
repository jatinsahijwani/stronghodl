import { LucideIcon } from 'lucide-react'

interface GovernanceCardProps {
  title: string
  description: string
  status: 'active' | 'pending' | 'completed' | 'failed'
  progress?: number
  icon?: LucideIcon
  footer?: React.ReactNode
  onClick?: () => void
}

export function GovernanceCard({
  title,
  description,
  status,
  progress,
  icon: Icon,
  footer,
  onClick,
}: GovernanceCardProps) {
  const statusColors = {
    active: 'bg-success/10 text-success border-success/30',
    pending: 'bg-warning/10 text-warning border-warning/30',
    completed: 'bg-primary/10 text-primary border-primary/30',
    failed: 'bg-destructive/10 text-destructive border-destructive/30',
  }

  const statusLabels = {
    active: 'Active',
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed',
  }

  return (
    <div
      onClick={onClick}
      className="glass rounded-xl p-5 hover:bg-card/70 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {Icon && (
          <div className="ml-4">
            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        )}
      </div>

      {progress !== undefined && (
        <div className="mb-4">
          <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
        {footer && <div className="text-xs text-muted-foreground">{footer}</div>}
      </div>
    </div>
  )
}
