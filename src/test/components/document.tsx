import React, {FC, ReactNode} from 'react'
import {Meta, Preloads, Styles, Scripts, State} from '../../client'

export interface DocumentProps {
  children: ReactNode
}

export const Document: FC<DocumentProps> = ({children}) => (
  <html lang="ru">
    <head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/manifest.json" />
      <Meta />
      <Preloads />
      <Styles />
    </head>
    <body>
      {children}
      <State />
      <Scripts />
      <script src="https://cdn.test.com/script.js" async />
    </body>
  </html>
)
