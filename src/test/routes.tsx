import {lazy, type PageRoute} from '../client'
import StaticImport from './components/static-import'
import NotFound from './components/not-found'

const HomePage = lazy(() => import('./components/home'))
const GetData = lazy(() => import('./components/get-data'))
const GetAsyncData = lazy(() => import('./components/get-async-data'))
const Param = lazy(() => import('./components/param'))
const CustomContext = lazy(() => import('./components/custom-context'))
const NoGetData = lazy(() => import('./components/no-get-data'))
const Redirect = lazy(() => import('./components/redirect'))

export const routes: PageRoute[] = [
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/get-data',
    Component: GetData
  },
  {
    path: '/get-async-data',
    Component: GetAsyncData
  },
  {
    path: '/param/:message',
    Component: Param
  },
  {
    path: '/custom-context',
    Component: CustomContext
  },
  {
    path: '/static-import',
    Component: StaticImport
  },
  {
    path: '/no-get-data',
    Component: NoGetData
  },
  {
    path: '/redirect',
    Component: Redirect
  },
  {
    path: '*',
    Component: NotFound
  }
]
