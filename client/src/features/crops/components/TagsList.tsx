import type { BadgeProps, ElementProps } from '@mantine/core'

import { Badge, Group } from '@mantine/core'

type TagsListProps = {
  tags: string[]
  badgeProps?: BadgeProps & ElementProps<'div', keyof BadgeProps>
}

export function TagsList({ tags, badgeProps }: TagsListProps) {
  return (
    <Group gap={4}>
      {tags.map((tag, i) => (
        <Badge
          radius="sm"
          color="dark.7"
          c="dark.1"
          key={i}
          size="sm"
          {...badgeProps}
        >
          {tag}
        </Badge>
      ))}
    </Group>
  )
}
