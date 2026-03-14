'use client'

import { Bell, Search } from 'lucide-react'

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card/40 backdrop-blur-md flex items-center justify-between px-8">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search proposals, transactions..."
            className="w-full bg-muted/20 border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-muted/20 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </button>
        
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent cursor-pointer hover:opacity-80 transition-opacity" />
      </div>
    </header>
  )
}
