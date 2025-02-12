import type { SubheaderBreadcrumb, SubheaderTab } from './subheader.types'

import { Box, Container, Title } from '@mantine/core'

import { BaseSubheaderBreadcrumbs } from './BaseSubheaderBreadcrumbs'
import { BaseSubheaderTabs } from './BaseSubheaderTabs'

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
        <Box mb="2rem">{children}</Box>
        <BaseSubheaderTabs tabs={tabs} />
      </Container>
    </Box>
  )
}

function BaseSubheaderTitle({ children }: { children: React.ReactNode }) {
  return (
    <Title order={1} textWrap="balance" lineClamp={2}>
      {children}
    </Title>
  )
}

BaseSubheader.Title = BaseSubheaderTitle
