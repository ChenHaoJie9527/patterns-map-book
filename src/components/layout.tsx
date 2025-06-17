import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode
  children: React.ReactNode
  sidebarWidth?: string
}

export function SidebarLayout({
  sidebar,
  children,
  sidebarWidth = "240px",
  className,
  ...props
}: SidebarLayoutProps) {
  return (
    <div
      className={cn("flex h-screen w-full overflow-hidden", className)}
      {...props}
    >
      {/* 侧边栏 */}
      <aside
        className="flex-shrink-0 border-r border-gray-200 bg-white"
        style={{ width: sidebarWidth }}
      >
        {sidebar}
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 overflow-auto">
        <div className="h-full w-full p-6">
          {children}
        </div>
      </main>
    </div>
  )
} 