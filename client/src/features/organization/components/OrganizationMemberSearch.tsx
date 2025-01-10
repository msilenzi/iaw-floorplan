import { Group, Select } from '@mantine/core'

import { SearchInput } from '@Common/ui/SearchInput'

import { useOrganizationStore } from '@Organization/store/useOrganizationStore'

type OrganizationMemberSearchProps = {
  isLoading: boolean
}

export function OrganizationMemberSearch({
  isLoading,
}: OrganizationMemberSearchProps) {
  const searchValue = useOrganizationStore((state) => state.searchValue)
  const searchField = useOrganizationStore((state) => state.searchField)
  const setSearchValue = useOrganizationStore((state) => state.setSearchValue)
  const setSearchField = useOrganizationStore((state) => state.setSearchField)

  return (
    <Group mt="xs" align="center" justify="center">
      <SearchInput
        value={searchValue}
        setValue={(value) => setSearchValue(value)}
        placeholder={`Buscar por ${searchField === 'name' ? 'nombre' : 'correo'}`}
        disabled={isLoading}
      />
      <Select
        value={searchField}
        onChange={(value) => setSearchField(value as 'name' | 'email')}
        data={[
          { label: 'Nombre', value: 'name' },
          { label: 'Correo', value: 'email' },
        ]}
        w="12ch"
        allowDeselect={false}
      />
    </Group>
  )
}
