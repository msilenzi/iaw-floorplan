import { useState } from 'react'

import {
  Button,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'

type DeleteModalProps = {
  isOpen: boolean
  title: string
  value: string
  btnText: string
  isLoading: boolean
  children: React.ReactNode
  onClose: () => void
  onDelete: React.FormEventHandler<HTMLFormElement>
}

export function DeleteModal({
  isOpen,
  title,
  value,
  btnText,
  isLoading,
  children,
  onClose,
  onDelete,
}: DeleteModalProps) {
  const [inputValue, setInputValue] = useState('')

  function handleClose() {
    if (!isLoading) onClose()
  }

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title={
        <Group align="center" gap="xs">
          <IconAlertCircle
            stroke={2}
            style={{ color: 'var(--mantine-color-red-6)' }}
          />
          <Title order={4} c="red.6">
            {title}
          </Title>
        </Group>
      }
    >
      <form onSubmit={onDelete}>
        <fieldset
          style={{ border: 'none', padding: 0, margin: 0 }}
          disabled={isLoading}
        >
          <Stack gap="md">
            {children}
            <Text fw={700} fz="sm">
              Esta acción no se puede deshacer.
            </Text>
            <TextInput
              label={`Para confirmar, ingrese "${value}" en el campo a continuación:`}
              placeholder={value}
              styles={{ label: { marginBottom: '.33em' } }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              type="submit"
              color="red"
              fullWidth
              disabled={value !== inputValue}
            >
              {btnText}
            </Button>
          </Stack>
        </fieldset>
      </form>
    </Modal>
  )
}
