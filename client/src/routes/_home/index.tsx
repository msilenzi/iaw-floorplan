import { useAuth0 } from '@auth0/auth0-react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { UnauthenticatedHeader } from '@Common/components/Header'
import { LoadingPage } from '@Common/components/LoadingPage'
import { HomeFeaturesSection } from '@Home/components/HomeFeaturesSection'
import { HomeHero } from '@Home/components/HomeHero'

export const Route = createFileRoute('/_home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()

  if (isLoading) {
    return <LoadingPage />
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
