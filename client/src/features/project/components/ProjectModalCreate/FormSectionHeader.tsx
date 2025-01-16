import { ActionIcon, Group, Title } from '@mantine/core'

import { IconPlus } from '@tabler/icons-react'

type FormSectionHeaderProps = {
  title: string
  rightSection?: React.ReactNode
}

export function FormSectionHeader({
  title,
  rightSection,
}: FormSectionHeaderProps) {
  return (
    <Group justify="space-between" align="center">
      <Title order={4}>{title}</Title>
      {rightSection}
    </Group>
  )
}

type FormSectionheaderAddButtonProps = {
  onClick: () => void
}

FormSectionHeader.AddButton = function FormSectionheaderAddButton({
  onClick,
}: FormSectionheaderAddButtonProps) {
  return (
    <ActionIcon variant="subtle" color="dark.1" onClick={onClick}>
      <IconPlus width="80%" height="80%" stroke={2} />
    </ActionIcon>
  )
}
