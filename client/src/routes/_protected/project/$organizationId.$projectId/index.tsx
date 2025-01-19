import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello &quot;/_protected/project/$organizationId/$projectId/&quot;!
    </div>
  )
}
