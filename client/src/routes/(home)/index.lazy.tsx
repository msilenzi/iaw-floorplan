import HomeFeaturesSection from '@/home/components/HomeFeaturesSection'
import HomeHeader from '@/home/components/HomeHeader'
import HomeHero from '@/home/components/HomeHero'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <HomeHeader />
      <HomeHero />
      <HomeFeaturesSection />
    </>
  )
}
