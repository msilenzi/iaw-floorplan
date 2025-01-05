import { useAuth0 } from '@auth0/auth0-react'

import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Box, Group, Loader } from '@mantine/core'

import { LoadingHeader, UnauthenticatedHeader } from '@Common/components/Header'

import { HomeFeaturesSection } from '@Home/components/HomeFeaturesSection'
import { HomeHero } from '@Home/components/HomeHero'

export const Route = createFileRoute('/_home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()

  if (isLoading) {
    return <LoadingView />
  }

  if (isAuthenticated) {
    void navigate({ to: '/my-organizations' })
  }

  return (
    <>
      <UnauthenticatedHeader />
      <HomeHero />
      <HomeFeaturesSection />
    </>
  )
}

function LoadingView() {
  return (
    <Box h="100dvh" bg="dark.8">
      <LoadingHeader />
      <Group mt={'20dvh'} w="100%" justify="center">
        <Loader size={'6rem'} color="dark.5" />
      </Group>
    </Box>
  )
}
