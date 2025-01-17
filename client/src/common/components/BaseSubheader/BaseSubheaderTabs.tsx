import { useLocation, useNavigate } from '@tanstack/react-router'

import { Tabs } from '@mantine/core'

import { SubheaderTab } from './subheader.types'

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
      onChange={(value) => void navigate({ to: value! })}
    >
      <Tabs.List classNames={{ list: classes.tabList }}>
        {tabs
          .filter(({ hidden }) => !hidden)
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
