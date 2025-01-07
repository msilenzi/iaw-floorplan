import { Skeleton, Table, useMantineTheme } from '@mantine/core'

import { DataTableProps } from './dataTable.types'

import classes from './DataTable.module.css'

export function DataTable<T extends object>({
  data,
  columnsConfiguration,
  isLoading,
  loadingRowsLength,
  rowKey,
  props,
}: DataTableProps<T>) {
  return (
    <Table
      verticalSpacing="md"
      layout="fixed"
      className={classes.table}
      {...props?.table}
    >
      <Table.Thead>
        <Table.Tr>
          {columnsConfiguration.map(({ key, label, props }) => (
            <Table.Th key={key as React.Key} {...props?.th}>
              {label}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {isLoading ? (
          <BodyLoading
            columnsConfiguration={columnsConfiguration}
            loadingRowsLength={loadingRowsLength}
          />
        ) : (
          <BodyContent
            data={data}
            columnsConfiguration={columnsConfiguration}
            rowKey={rowKey}
            props={props}
          />
        )}
      </Table.Tbody>
    </Table>
  )
}

type BodyLoadingProps<T extends object> = Pick<
  DataTableProps<T>,
  'columnsConfiguration' | 'loadingRowsLength'
>

function BodyLoading<T extends object>({
  columnsConfiguration,
  loadingRowsLength,
}: BodyLoadingProps<T>) {
  const theme = useMantineTheme()

  return Array.from({ length: loadingRowsLength }).map((_, i) => (
    <Table.Tr key={i}>
      {columnsConfiguration.map(({ key, props }) => (
        <Table.Td key={key as string} {...props?.td}>
          <Skeleton height={theme.spacing.lg} />
        </Table.Td>
      ))}
    </Table.Tr>
  ))
}

type BodyContentProps<T extends object> = Pick<
  DataTableProps<T>,
  'data' | 'columnsConfiguration' | 'rowKey' | 'props'
>

function BodyContent<T extends object>({
  data,
  columnsConfiguration,
  rowKey,
  props,
}: BodyContentProps<T>) {
  return data.map((rowData) => (
    <Table.Tr
      key={rowData[rowKey] as React.Key}
      {...(typeof props?.tr === 'function' ? props.tr(rowData) : props?.tr)}
    >
      {columnsConfiguration.map(({ key, renderRow, props }) => (
        <Table.Td
          key={key as React.Key}
          {...(typeof props?.td === 'function' ? props.td(rowData) : props?.td)}
        >
          {/* @ts-expect-error funciona bien */}
          {renderRow(rowData[key], rowData)}
        </Table.Td>
      ))}
    </Table.Tr>
  ))
}
