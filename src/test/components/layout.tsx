import React, {FC, ReactNode} from 'react'

export interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({children}) => (
  <main className="layout">{children}</main>
)
