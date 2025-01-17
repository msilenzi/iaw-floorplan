import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/project/$projectId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello &quot;/_protected/project/$projectId&quot;!</div>
}
