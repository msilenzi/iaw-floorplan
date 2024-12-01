import HomeFeaturesSection from '@/home/components/HomeFeaturesSection'
import HomeNavbar from '@/home/components/HomeNavbar'
import HomeHero from '@/home/components/HomeHero'
import { useAuth0 } from '@auth0/auth0-react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()

  // Si el usuario tiene una sesión iniciada lo redirige a /app/organizations.
  // No es necesario esperar a que termine de cargar para confirmar si tiene
  // o no una sesión iniciada, ya que si no tiene sesión iniciada `isLoading`
  // es false.
  if (isLoading || isAuthenticated) {
    void navigate({ to: '/organizations' })
  }

  return (
    <>
      <HomeNavbar />
      <HomeHero />
      <HomeFeaturesSection />
    </>
  )
}
