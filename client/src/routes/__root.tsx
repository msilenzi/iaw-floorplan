import React from 'react'

import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

// Only importing and using Devtools in development:
const TanStackRouterDevtools =
  import.meta.env.MODE === 'development' ?
    React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )
  : () => null

const TanStackQueryDevtools =
  import.meta.env.MODE === 'development' ?
    React.lazy(() =>
      import('@tanstack/react-query-devtools').then((res) => ({
        default: res.ReactQueryDevtools,
      })),
    )
  : () => null

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
      <TanStackQueryDevtools initialIsOpen={false} />
    </>
  )
}
