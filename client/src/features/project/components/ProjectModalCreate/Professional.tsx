import {
  CloseButton,
  Fieldset,
  Group,
  Select,
  Stack,
  Text,
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
        <TextInput label="Nombre" />
        <DniCuit />
        <TextInput label="Dirección" />
        <Group>
          <TextInput flex={1} label="Matrícula provincial" />
          <TextInput flex={1} label="Matrícula municipal" />
        </Group>
      </Stack>
    </Fieldset>
  )
}

function DniCuit() {
  return (
    <>
      <Text size="sm">DNI o CUIT</Text>
      <Group gap="sm">
        <Select
          data={[
            { label: 'DNI', value: 'dni' },
            { label: 'CUIT', value: 'cuit' },
          ]}
          w={'10ch'}
          allowDeselect={false}
          defaultValue="dni"
        />
        <TextInput flex={1} />
      </Group>
    </>
  )
}
