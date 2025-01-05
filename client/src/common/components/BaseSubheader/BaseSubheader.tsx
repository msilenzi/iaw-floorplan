import { Box, Container } from '@mantine/core'

import { BaseSubheaderBreadcrumbs } from './BaseSubheaderBreadcrumbs'
import { BaseSubheaderTabs } from './BaseSubheaderTabs'
import type { SubheaderBreadcrumb, SubheaderTab } from './subheader.types'

type SubheaderProps = {
  breadcrumbs: SubheaderBreadcrumb[]
  tabs: SubheaderTab[]
  children: React.ReactNode
}

export function BaseSubheader({ breadcrumbs, children, tabs }: SubheaderProps) {
  return (
    <Box
      pt="3rem"
      bg="dark.8"
      style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}
    >
      <Container size="md">
        <BaseSubheaderBreadcrumbs breadcrumbs={breadcrumbs} />
        <Box mb="3rem">{children}</Box>
        <BaseSubheaderTabs tabs={tabs} />
      </Container>
    </Box>
  )
}