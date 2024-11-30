import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/organizations/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <h2>/_protected/organizations/</h2>
}
