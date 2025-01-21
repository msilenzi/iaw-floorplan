import type { SubheaderTab } from './subheader.types'

import { useLocation, useNavigate } from '@tanstack/react-router'
import { Tabs } from '@mantine/core'

import classes from './BaseSubheaderTabs.module.css'

type SubheaderTabsProps = {
  tabs: SubheaderTab[]
}

export function BaseSubheaderTabs({ tabs }: SubheaderTabsProps) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Tabs
      variant="outline"
      radius="md"
      classNames={{
        list: classes.tabsList,
        tab: classes.tab,
      }}
      value={location.pathname}
      onChange={(value) => value != null && void navigate({ to: value })}
    >
      <Tabs.List classNames={{ list: classes.tabList }}>
        {tabs
          .filter(({ hidden }) => !(hidden ?? false))
          .map(({ Icon, label, to }) => (
            <Tabs.Tab
              key={to}
              value={to}
              leftSection={<Icon size={14} stroke={2} />}
              classNames={{ tab: classes.tab }}
            >
              {label}
            </Tabs.Tab>
          ))}
      </Tabs.List>
    </Tabs>
  )
}
