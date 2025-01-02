import { UseQueryResult } from '@tanstack/react-query'

import {
  ActionIcon,
  Button,
  ButtonProps,
  ElementProps,
  Loader,
} from '@mantine/core'

import { IconReload } from '@tabler/icons-react'

type RefetchBtnProps = { query: UseQueryResult } & ButtonProps &
  ElementProps<'button', keyof ButtonProps>

export default function RefetchBtn({ query, ...props }: RefetchBtnProps) {
  return (
    <Button
      {...props}
      size="compact-sm"
      variant="transparent"
      color="dark.2"
      fw={400}
      onClick={() => !query.isFetching && void query.refetch()}
      styles={{
        ...props.styles,
        section: {
          marginInlineStart: '0.15rem',
          marginBottom: '-0.1rem',
          verticalAlign: 'center',
        },
      }}
      rightSection={
        query.isFetching ?
          <Loader size="12" ms="0.2em" color="dark.2" />
        : <ActionIcon variant="transparent" size="sm" c="inherit">
            <IconReload style={{ width: '75%', height: '75%' }} stroke={2} />
          </ActionIcon>
      }
    >
      Actualizado a las{' '}
      {new Date(query.dataUpdatedAt).toLocaleTimeString('es-ES')}
    </Button>
  )
}
