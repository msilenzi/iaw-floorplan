import { Group, Select } from '@mantine/core'

import { SearchInput } from '@Common/ui/SearchInput'

import { useMemberSearchForm } from '@Organization/context/MemberSearchForm/MemberSearchFormContext'

type OrganizationMemberSearchProps = {
  isLoading: boolean
}

export function OrganizationMemberSearch({
  isLoading,
}: OrganizationMemberSearchProps) {
  const form = useMemberSearchForm()

  return (
    <Group align="center" justify="center" mb="md">
      <SearchInput
        placeholder={`Buscar por ${form.getValues().searchField === 'name' ? 'nombre' : 'correo'}`}
        disabled={isLoading}
        onClear={() => form.setFieldValue('searchValue', '')}
        key={form.key('searchValue')}
        {...form.getInputProps('searchValue')}
      />
      <Select
        data={[
          { label: 'Nombre', value: 'name' },
          { label: 'Correo', value: 'email' },
        ]}
        w="12ch"
        allowDeselect={false}
        key={form.key('searchField')}
        {...form.getInputProps('searchField')}
      />
    </Group>
  )
}
