import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/organizations/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello &quot;/_protected/organizations/_layout/&quot;!</div>
}
