import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/organization/$organizationId/members',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello &quot;/organization/$organizationId/members&quot;!</div>
}
