import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/organizations/_layout/$organizationId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId } = Route.useParams()

  return (
    <div>
      <p>
        Hello &quot;/_protected/organizations/_layout/$organizationId&quot;!
      </p>
      <p>{organizationId}</p>
    </div>
  )
}
