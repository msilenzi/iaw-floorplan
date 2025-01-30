import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/_layout/',
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
