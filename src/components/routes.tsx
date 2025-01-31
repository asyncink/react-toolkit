import React, {Suspense, useState, useEffect} from 'react'
import {
  useLocation,
  useNavigate,
  Navigate,
  Route,
  Routes as BaseRoutes
} from 'react-router-dom'
import {type PageRoute} from '../common/types'
import {useAppContext} from './context'
import {loadRouteData} from './loader'

/** Routing props */
export interface RoutesProps {
  routes: PageRoute[]
}

/** Routing component with initial and meta data */
export const Routes: React.FC<RoutesProps> = ({routes}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const {
    data,
    meta,
    styles: _styles,
    scripts: _scripts,
    onChangeMetaData,
    ...rest
  } = useAppContext()

  const [currentLocation, setCurrentLocation] = useState(location)
  const [routeData, setRouteData] = useState({data, meta, isLoading: false})

  useEffect(() => {
    if (location !== currentLocation) {
      const {pathname} = location

      const context = {
        location,
        navigate,
        ...rest
      }

      setRouteData((prevState) => ({...prevState, isLoading: true}))

      loadRouteData({routes, pathname, context}).then((routeData) => {
        window.scrollTo(0, 0)
        setRouteData((prevState) => ({
          ...prevState,
          ...routeData,
          isLoading: false
        }))
        setCurrentLocation(location)
        onChangeMetaData?.(routeData.meta ?? {})
      })
    }
  }, [location, currentLocation]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Suspense>
      <BaseRoutes location={currentLocation}>
        {routeData.data?.redirect && <Navigate to={routeData.data.redirect} />}
        {routes.map(({path, Component, ...routeProps}) => (
          <Route
            {...routeProps}
            key={path}
            path={path}
            element={<Component {...routeData.data} />}
          />
        ))}
      </BaseRoutes>
    </Suspense>
  )
}
