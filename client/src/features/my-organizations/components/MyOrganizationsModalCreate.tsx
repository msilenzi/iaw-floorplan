import { useEffect, useState } from 'react'

import { useNavigate } from '@tanstack/react-router'

import {
  Code,
  Group,
  Loader,
  Modal,
  Text,
  TextInput,
  lighten,
  useMantineTheme,
} from '@mantine/core'

import { IconPlus } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'

import { useCreateOrganizationForm } from '@MyOrganizations/hooks/useCreateOrganizationForm'
import { useCreateOrganizationMutation } from '@MyOrganizations/hooks/useCreateOrganizationMutation'

type MyOrganizationsModalCreateProps = {
  isOpen: boolean
  onClose: () => void
}

export function MyOrganizationsModalCreate({
  isOpen,
  onClose,
}: MyOrganizationsModalCreateProps) {
  const theme = useMantineTheme()

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
    void navigate({ to: `/organization/${resp.data._id}` })
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
            Una{' '}
            <Text
              component="a"
              href="https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions#escribir_un_patr%C3%B3n_de_expresi%C3%B3n_regular"
              referrerPolicy="no-referrer"
              target="_blank"
              td="underline"
              c={lighten(theme.colors.dark[2], 0.15)}
            >
              Expresión Regular
            </Text>{' '}
            es una secuencia de caracteres que define un patrón de búsqueda. En
            este caso se usará para validar que los expedientes de los proyectos
            sean válidos. Si quieres permitir cualquier valor para los
            expedientes puedes dejar el valor por defecto <Code>{'/*'}</Code>.
          </Text>
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
