import { forwardRef, useState } from 'react'

import type { ActionIconProps, ElementProps } from '@mantine/core'

import { ActionIcon } from '@mantine/core'
import { IconDotsVertical } from '@tabler/icons-react'

type TableActionButtonProps = ActionIconProps &
  ElementProps<'button', keyof ActionIconProps>

export const TableActionButton = forwardRef<
  HTMLButtonElement,
  TableActionButtonProps
>(function TableActionButton(props: TableActionButtonProps, ref) {
  const [hovered, setHovered] = useState(false)

  return (
    <ActionIcon
      size="md"
      variant={hovered ? 'default' : 'transparent'}
      color={hovered ? undefined : 'dimmed'}
      ref={ref}
      {...props}
      onMouseEnter={(e) => {
        props.onMouseEnter?.(e)
        setHovered(true)
      }}
      onMouseLeave={(e) => {
        props.onMouseLeave?.(e)
        setHovered(false)
      }}
    >
      <IconDotsVertical />
    </ActionIcon>
  )
})
