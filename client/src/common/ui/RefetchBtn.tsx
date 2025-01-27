import type { ButtonProps, ElementProps } from '@mantine/core'
import type { UseQueryResult } from '@tanstack/react-query'

import { ActionIcon, Button, Loader } from '@mantine/core'
import { IconReload } from '@tabler/icons-react'

import classes from './RefetchBtn.module.css'

type RefetchBtnProps = { query: UseQueryResult } & ButtonProps &
  ElementProps<'button', keyof ButtonProps>

export function RefetchBtn({ query, ...props }: RefetchBtnProps) {
  return (
    <Button
      {...props}
      size="compact-sm"
      variant="transparent"
      color="dark.2"
      fw={400}
      onClick={() => !query.isFetching && void query.refetch()}
      className={classes.refetchBtn}
      styles={(...args) => ({
        ...(typeof props.styles === 'function'
          ? props.styles(...args)
          : props.styles),
        section: {
          marginInlineStart: '0.15rem',
          marginBottom: '-0.1rem',
          verticalAlign: 'center',
        },
      })}
      rightSection={
        query.isFetching ? (
          <Loader size="12" mx={5} color="dark.2" />
        ) : (
          <ActionIcon variant="transparent" size="sm" c="inherit">
            <IconReload style={{ width: '75%', height: '75%' }} stroke={2} />
          </ActionIcon>
        )
      }
      disabled={query.isFetching || query.isLoading}
    >
      Actualizado a las{' '}
      {new Date(query.dataUpdatedAt).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })}
    </Button>
  )
}
