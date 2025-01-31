import type {RouteProps, NavigateFunction, RouteMatch} from 'react-router-dom'
import type {Location} from 'history'
import type {Request, Response} from 'express'

/** Rendering context */
export interface Context extends Record<string, any> {
  /** Express.js [request](https://expressjs.com/en/4x/api.html#req) object (server-only) */
  req?: Request
  /** Express [response](https://expressjs.com/en/4x/api.html#res) object (server-only) */
  res?: Response
  /** Location object */
  location?: Location
  /** React Router navigate function */
  navigate?: NavigateFunction
  /** Matched route params */
  match?: RouteMatch
}

/** Initial data interface */
export interface InitialData extends Record<string, any> {
  /** URL to redirect */
  redirect?: string
  /** HTTP status code */
  statusCode?: number
}

/** Get initial data for a page */
export type GetInitialData = (
  context: Context
) => InitialData | void | Promise<InitialData | void>

/** Meta data interface */
export interface MetaData extends Record<string, any> {}

/** Get meta data for a page */
export type GetMetaData = (
  context: Context
) => MetaData | void | Promise<MetaData | void>

/**
 * Page component
 *
 * ```tsx
 * import React from 'react'
 * import {PageComponent} from '@rambler-tech/react-toolkit/client'
 * import {api} from './api'
 *
 * export interface MainPageProps {
 *   someProp: any
 * }
 *
 * const MainPage: PageComponent<MainPageProps> = ({someProp}) => (
 *   <div>
 *     <h1>Main page</h1>
 *     <p>{someProp}</p>
 *   </div>
 * )
 *
 * MainPage.getMetaData = () => ({
 *   title: 'Main page',
 *   description: '...'
 * })
 *
 * MainPage.getInitialData = async () => {
 *   const {someProp} = await api.getSomeProp()
 *
 *   return {someProp}
 * }
 *
 * export default MainPage
 * ```
 */
export type PageComponent<P = any> = React.ComponentType<P> & {
  getMetaData?: GetMetaData
  getInitialData?: GetInitialData
}

/** Lazy page component */
export interface LazyPageComponent extends React.LazyExoticComponent<any> {
  getMetaData: GetMetaData
  getInitialData: GetInitialData
}

/** Page route object for React Router */
export type PageRoute = RouteProps & {
  Component: PageComponent | LazyPageComponent
}

/** Base render/hydrate options */
export interface RenderOptions extends Record<string, any> {
  /**
   * Routes list
   *
   * ```tsx
   * import {lazy} from '@rambler-tech/react-toolkit/client'
   *
   * const MainPage = lazy(() => import('./pages/main'))
   * const AboutPage = lazy(() => import('./pages/about'))
   *
   * export const routes = [
   *   {
   *     path: '/',
   *     component: MainPage
   *   },
   *   {
   *     path: '/about',
   *     component: AboutPage
   *   }
   * ]
   * ```
   */
  routes: PageRoute[]
  /**
   * Custom layout
   *
   * ```tsx
   * import React, {FC, ReactNode} from 'react'
   * import {ThemeProvider} from 'awesome-ui'
   * import styles from './styles.module.css'
   *
   * export interface MyLayoutProps {
   *   children: ReactNode
   * }
   *
   * export const MyLayout: FC<MyLayoutProps> = ({children}) => {
   *   return (
   *     <ThemeProvider>
   *       <main className={styles.main}>{children}</main>
   *     </ThemeProvider>
   *   )
   * }
   * ```
   */
  Layout?: React.FC<any>
  /**
   * Custom document
   *
   * ```tsx
   * import React, {FC, ReactNode} from 'react'
   * import {Meta, Preloads, Styles, Scripts, State} from '@rambler-tech/react-toolkit/client'
   *
   * export interface MyDocumentProps {
   *   children: ReactNode
   * }
   *
   * export const MyDocument: FC<MyDocumentProps> = ({children}) => (
   *   <html lang="ru">
   *     <head>
   *       <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
   *       <meta charSet="utf-8" />
   *       <meta name="viewport" content="width=device-width, initial-scale=1" />
   *       <Meta />
   *       <link rel="manifest" href="/manifest.json" />
   *       <Preloads />
   *       <link
   *         rel="preconnect"
   *         href="https://mc.yandex.ru"
   *         crossOrigin="anonymous"
   *       />
   *       <Styles />
   *     </head>
   *     <body>
   *       {children}
   *       <State />
   *       <Scripts />
   *       <script src="https://vp.rambler.ru/player/sdk.js" async />
   *     </body>
   *   </html>
   * )
   * ```
   */
  Document?: React.FC<any>
}
