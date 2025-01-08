import {
  Accordion,
  Badge,
  Group,
  Title,
  lighten,
  useMantineTheme,
} from '@mantine/core'

import { TablerIcon } from '@tabler/icons-react'

type AccordionDataContainerProps = {
  title: string
  dataLength?: number
  Icon: TablerIcon
  children: React.ReactNode
}

export default function AccordionDataContainer({
  title,
  dataLength,
  Icon,
  children,
}: AccordionDataContainerProps) {
  const theme = useMantineTheme()

  return (
    <Accordion mt="xl" variant="filled" defaultValue={title}>
      <Accordion.Item value={title}>
        <Accordion.Control icon={<Icon />}>
          <Group align="center" gap="xs">
            <Title order={4}>{title}</Title>
            {dataLength && (
              <Badge color="dark.5" size="sm" radius="sm" bd="none">
                {dataLength}
              </Badge>
            )}
          </Group>
        </Accordion.Control>
        <Accordion.Panel bg={lighten(theme.colors.dark[7], 0.025)}>
          {children}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
