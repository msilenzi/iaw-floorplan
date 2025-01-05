import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/organization/$organizationId/requests',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/organization/$organizationId/requests"!</div>
}
