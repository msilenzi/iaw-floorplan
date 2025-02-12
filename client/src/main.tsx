import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { Auth0Provider } from '@auth0/auth0-react'
import { routeTree } from './routeTree.gen.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import { ApiProvider } from '@Common/api'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import 'react-image-crop/dist/ReactCrop.css'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
})

const root = document.getElementById('root')
if (root == null) throw new Error('Root element not found.')

createRoot(root).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        }}
      >
        <ApiProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Notifications position="top-right" />
          </QueryClientProvider>
        </ApiProvider>
      </Auth0Provider>
    </MantineProvider>
  </StrictMode>,
)
