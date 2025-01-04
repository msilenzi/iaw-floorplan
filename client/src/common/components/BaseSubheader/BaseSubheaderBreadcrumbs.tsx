import { Link } from '@tanstack/react-router'

import { Anchor, Breadcrumbs } from '@mantine/core'

import type { SubheaderBreadcrumb } from './subheader.types'

type SubheaderBreadcrumbsProps = {
  breadcrumbs: SubheaderBreadcrumb[]
}

export function BaseSubheaderBreadcrumbs({
  breadcrumbs,
}: SubheaderBreadcrumbsProps) {
  return (
    <Breadcrumbs pb="sm" styles={{ separator: { opacity: 0.5 } }}>
      {breadcrumbs.map(({ label, to }) => (
        <Anchor key={to} c="dimmed" fz="sm" component={Link} to={to}>
          {label}
        </Anchor>
      ))}
    </Breadcrumbs>
  )
}
