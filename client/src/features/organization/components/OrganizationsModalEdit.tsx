import { useEffect, useState } from 'react'

import { Button, Group, Loader, Modal, Text, TextInput } from '@mantine/core'
import { IconPencil, IconReload } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'
import { useEditOrganizationForm } from '@Organization/hooks/useEditOrganizationForm'
import { useEditOrganizationMutation } from '@Organization/hooks/useEditOrganizationMutation'

type OrganizationsModalEditProps = {
  isOpen: boolean
  onClose: () => void
  organizationId: string
}

export function OrganizationsModalEdit({
  isOpen,
  onClose,
  organizationId,
}: OrganizationsModalEditProps) {
  const { isPending, mutateAsync } = useEditOrganizationMutation(organizationId)

  const form = useEditOrganizationForm()
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
    await mutateAsync({
      name: values.name,
      recordRegex: values.regex,
    })
    form.setInitialValues({
      name: values.name,
      regex: values.regex.slice(1, values.regex.length - 1),
      regexTest: '',
    })
    form.reset()
    onClose()
  })

  const color: string | undefined =
    form.getValues().regex.trim().length > 0 &&
    form.getValues().regexTest.trim().length > 0
      ? isTestValid
        ? 'var(--mantine-color-green-filled)'
        : 'var(--mantine-color-red-filled)'
      : undefined

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title="Editar organización"
      styles={{ title: { fontWeight: 700 } }}
      closeButtonProps={{
        disabled: isPending,
      }}
    >
      <form onSubmit={handleSubmit} onReset={() => form.reset()}>
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
            mb="lg"
          />
          <TextInput
            label="Patrón RegExp para los expedientes"
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
            description="Utiliza el campo a continuación para verificar como funciona tu patrón"
            key={form.key('regexTest')}
            {...form.getInputProps('regexTest')}
            error={
              form.getValues().regexTest
                ? isTestValid
                  ? 'Cumple con el patrón'
                  : 'No cumple con el patrón'
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
              input: { borderColor: color, color },
              error: { color },
            }}
            mb="sm"
          />
          <Text mb="lg" size="sm" c="dimmed">
            <Text span fw={700}>
              IMPORTANTE:
            </Text>{' '}
            Actualizar el patrón de la expresión regular solo afectará a los
            nuevos proyectos que crees y a los proyectos existentes cuyo
            expediente decidas cambiar.
          </Text>
          <Group justify="space-between" pt="sm">
            <Button
              type="reset"
              variant="filled"
              rightSection={<IconReload size={16} stroke={2.5} />}
              color="dark.5"
              disabled={isPending || !form.isDirty()}
            >
              Restablecer
            </Button>
            <PrimaryButton
              type="submit"
              rightSection={
                isPending ? (
                  <Loader size="14" color="dark.2" />
                ) : (
                  <IconPencil size={16} stroke={2.5} />
                )
              }
              disabled={
                isPending ||
                !form.isValid() ||
                !(form.isDirty('name') || form.isDirty('regex'))
              }
            >
              {isPending ? 'Editando organización' : 'Editar organización'}
            </PrimaryButton>
          </Group>
        </fieldset>
      </form>
    </Modal>
  )
}
