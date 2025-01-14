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
    <Breadcrumbs pb="0.25rem" styles={{ separator: { opacity: 0.5 } }}>
      {breadcrumbs.map(({ label, to }) => (
        <Anchor
          key={to}
          c="dimmed"
          fz="sm"
          component={Link}
          to={to}
          styles={{
            root: { maxWidth: '30ch', height: '100%', lineHeight: 1.3 },
          }}
          truncate="end"
        >
          {label}
        </Anchor>
      ))}
    </Breadcrumbs>
  )
}
