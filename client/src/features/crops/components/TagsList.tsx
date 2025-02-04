import type { BadgeProps, ElementProps, GroupProps } from '@mantine/core'

import { Badge, Group } from '@mantine/core'

type TagsListProps = {
  tags: string[]
  innerProps?: {
    badge?: BadgeProps & ElementProps<'div', keyof BadgeProps>
    container?: GroupProps & ElementProps<'div', keyof GroupProps>
  }
}

export function TagsList({ tags, innerProps }: TagsListProps) {
  if (tags.length === 0) return null

  return (
    <Group gap={4} {...innerProps?.container}>
      {tags.map((tag, i) => (
        <Badge
          radius="sm"
          color="dark.7"
          c="dark.1"
          key={i}
          size="sm"
          {...innerProps?.badge}
        >
          {tag}
        </Badge>
      ))}
    </Group>
  )
}
