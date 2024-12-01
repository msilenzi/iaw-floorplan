import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/organizations/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>Organizaciones</>
}
