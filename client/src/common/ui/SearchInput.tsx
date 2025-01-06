import { CloseButton, TextInput, type TextInputProps } from '@mantine/core'

import { IconSearch } from '@tabler/icons-react'

import classes from './SearchInput.module.css'

type SearchInputProps = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
} & TextInputProps

export function SearchInput({ value, setValue, ...props }: SearchInputProps) {
  return (
    <TextInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      leftSection={<IconSearch size={16} />}
      rightSection={
        <CloseButton
          aria-label="Limpiar búsqueda"
          onClick={() => setValue('')}
          style={{ display: value ? undefined : 'none' }}
        />
      }
      rightSectionPointerEvents="all"
      {...props}
      className={`${props.className ?? ''} ${classes.search}`}
    />
  )
}
