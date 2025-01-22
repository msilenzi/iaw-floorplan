import type { TextInputProps } from '@mantine/core'

import { CloseButton, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

import classes from './SearchInput.module.css'

type SearchInputProps = {
  onClear: () => void
} & TextInputProps

export function SearchInput({ onClear, ...props }: SearchInputProps) {
  return (
    <TextInput
      leftSection={<IconSearch size={16} />}
      rightSection={
        <CloseButton
          aria-label="Limpiar búsqueda"
          onClick={onClear}
          style={{
            display:
              props.value != null && props.value.toString().length !== 0
                ? undefined
                : 'none',
          }}
        />
      }
      rightSectionPointerEvents="all"
      {...props}
      className={`${props.className ?? ''} ${classes.search}`}
    />
  )
}
