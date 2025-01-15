import {
  CloseButton,
  Fieldset,
  Group,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'

type ProfessionalProps = {
  title: string
}

export function Professional({ title }: ProfessionalProps) {
  return (
    <Fieldset variant="default">
      <Stack gap="xs">
        <Group justify="space-between">
          <Title order={5}>{title}</Title>
          <CloseButton />
        </Group>
        <TextInput
          label="Nombre"
          withAsterisk
          placeholder="Lionel Andrés Messi Cuccittini"
        />
        <DniCuit />
        <TextInput
          label="Dirección"
          placeholder="Av. Siempreviva 742, Springfield, USA"
        />
        <Group>
          <TextInput
            flex={1}
            label="Matrícula provincial"
            placeholder="CAPBA 1234"
          />
          <TextInput
            flex={1}
            label="Matrícula municipal"
            placeholder="MLP 5678"
          />
        </Group>
      </Stack>
    </Fieldset>
  )
}

function DniCuit() {
  return (
    <>
      <Group gap="sm">
        <Select
          data={[
            { label: 'DNI', value: 'dni' },
            { label: 'CUIT', value: 'cuit' },
          ]}
          w={'10ch'}
          allowDeselect={false}
          defaultValue="dni"
          withAsterisk
          label="Tipo"
        />
        {/* TODO: cambiar si cambia el tipo */}
        <TextInput
          flex={1}
          withAsterisk
          label="DNI o CUIT"
          placeholder="12345678"
        />
      </Group>
    </>
  )
}
