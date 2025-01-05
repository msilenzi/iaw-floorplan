import { useEffect, useState } from 'react'

import { useNavigate } from '@tanstack/react-router'

import { Group, Loader, Modal, Text, TextInput } from '@mantine/core'

import { IconPlus } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'

import { useCreateOrganizationForm } from '@Organizations/hooks/useCreateOrganizationForm'
import { useCreateOrganizationMutation } from '@Organizations/hooks/useCreateOrganizationMutation'

type OrganizationsModalCreateProps = {
  isOpen: boolean
  onClose: () => void
}

export function OrganizationsModalCreate({
  isOpen,
  onClose,
}: OrganizationsModalCreateProps) {
  const navigate = useNavigate()
  const { isPending, mutateAsync } = useCreateOrganizationMutation()
  const { form } = useCreateOrganizationForm()
  const [isTestValid, setIsTestValid] = useState(true)

  useEffect(() => {
    const { regex, regexTest } = form.getValues()
    try {
      const reg = new RegExp(`^${regex.trim()}$`)
      setIsTestValid(reg.test(regexTest))
    } catch {
      setIsTestValid(false)
    }
  }, [form])

  function handleClose() {
    if (!isPending) onClose()
  }

  const handleSubmit = form.onSubmit(async (values) => {
    const resp = await mutateAsync({
      name: values.name,
      recordRegex: values.regex,
    })
    form.reset()
    onClose()
    void navigate({ to: `/organizations/${resp.data._id}` })
  })

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title="Crear organización"
      styles={{ title: { fontWeight: 700 } }}
      closeButtonProps={{
        disabled: isPending,
      }}
    >
      <form onSubmit={handleSubmit}>
        <fieldset
          style={{ margin: 0, padding: 0, border: 'none' }}
          disabled={isPending}
        >
          <TextInput
            label="Nombre"
            placeholder="Nombre de la organización"
            withAsterisk
            key={form.key('name')}
            {...form.getInputProps('name')}
            mb="md"
          />
          <TextInput
            label="Patrón RegExp de los expedientes"
            description="Se incluirán automáticamente ^ y $ en la expresión"
            placeholder=".*"
            withAsterisk
            key={form.key('regex')}
            {...form.getInputProps('regex')}
            mb="sm"
            leftSection={<Text fw={700}>^</Text>}
            rightSection={<Text fw={700}>$</Text>}
          />
          <TextInput
            description="Podés usar el campo a continuación para verificar como funciona tu patrón"
            key={form.key('regexTest')}
            {...form.getInputProps('regexTest')}
            error={
              form.getValues().regexTest && !isTestValid
                ? 'No cumple con el patrón'
                : null
            }
            color={
              form.getValues().regex.trim().length > 0 &&
              form.getValues().regexTest.trim().length > 0 &&
              isTestValid
                ? 'green'
                : undefined
            }
            styles={{
              input: {
                borderColor:
                  form.getValues().regex.trim().length > 0 &&
                  form.getValues().regexTest.trim().length > 0
                    ? isTestValid
                      ? 'var(--mantine-color-green-filled)'
                      : 'var(--mantine-color-red-filled)'
                    : undefined,
              },
            }}
            mb="lg"
          />
          <Group justify="end">
            <PrimaryButton
              type="submit"
              rightSection={
                isPending ? (
                  <Loader size="14" color="dark.2" />
                ) : (
                  <IconPlus size={16} stroke={3} />
                )
              }
              disabled={isPending}
            >
              {isPending ? 'Creando organización' : 'Crear organización'}
            </PrimaryButton>
          </Group>
        </fieldset>
      </form>
    </Modal>
  )
}
