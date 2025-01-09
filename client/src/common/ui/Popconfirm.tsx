import {
  Box,
  Button,
  ButtonProps,
  CloseButton,
  ElementProps,
  Group,
  Popover,
  PopoverProps,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

type PopconfirmProps = {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  children: React.ReactNode
  innerProps?: {
    popover?: PopoverProps
    confirmBtn?: ButtonProps & ElementProps<'button', keyof ButtonProps>
    cancelBtn?: ButtonProps & ElementProps<'button', keyof ButtonProps>
  }
}

export function Popconfirm({
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  children,
  innerProps,
}: PopconfirmProps) {
  const [opened, { close, open, toggle }] = useDisclosure(false)

  return (
    <Popover
      withArrow
      width={400}
      position="left"
      trapFocus
      opened={opened}
      onChange={toggle}
      {...innerProps?.popover}
    >
      <Popover.Target>
        <Box onClick={open}>{children}</Box>
      </Popover.Target>
      <Popover.Dropdown>
        <Group align="start" justify="space-between" wrap="nowrap">
          <Text fw={700} mb="xs">
            {title}
          </Text>
          <CloseButton size="sm" onClick={close} />
        </Group>
        <Text size="sm" mb="xs" c="dimmed">
          {description}
        </Text>
        <Group gap="xs" align="center" justify="end">
          <Button
            variant="transparent"
            color="dark.1"
            size="compact-sm"
            onClick={close}
            {...innerProps?.cancelBtn}
          >
            {cancelText}
          </Button>
          <Button color="blue" size="compact-sm" {...innerProps?.confirmBtn}>
            {confirmText}
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}
