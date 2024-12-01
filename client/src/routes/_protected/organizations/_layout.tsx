import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/organizations/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1>&quot;/_protected/organizations/_layout&quot;</h1>
      <Outlet />
    </>
  )
}
