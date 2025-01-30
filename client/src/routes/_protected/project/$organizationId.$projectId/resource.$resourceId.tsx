import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/resource/$resourceId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      &quot;/_protected/project/$organizationId/$projectId/resource/$resourceId&quot;!
    </div>
  )
}
