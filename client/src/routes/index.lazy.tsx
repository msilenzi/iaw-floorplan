import HomeFeaturesSection from '@/home/components/HomeFeaturesSection'
import HomeHero from '@/home/components/HomeHero'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <HomeHero />
      <HomeFeaturesSection />
    </>
  )
}
