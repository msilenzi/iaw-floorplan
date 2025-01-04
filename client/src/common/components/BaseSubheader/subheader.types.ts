import type { TablerIcon } from '@tabler/icons-react'

import type { FileRouteTypes } from '@/routeTree.gen'

export type SubheaderBreadcrumb = {
  label: string
  to: FileRouteTypes['to']
}

export type SubheaderTab = {
  label: string
  to: FileRouteTypes['to']
  Icon: TablerIcon
}
