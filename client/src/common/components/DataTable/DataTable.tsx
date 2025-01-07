import { Skeleton, Table, useMantineTheme } from '@mantine/core'

import { DataTableProps } from './dataTable.types'

export function DataTable<T extends object>({
  data,
  columnsConfiguration,
  isLoading,
  loadingRowsLength,
  rowKey,
}: DataTableProps<T>) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          {columnsConfiguration.map(({ key, label }) => (
            <Table.Th key={key as React.Key}>{label}</Table.Th>
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
      {columnsConfiguration.map(({ key }) => (
        <Table.Td key={key as string}>
          <Skeleton height={theme.spacing.lg} />
        </Table.Td>
      ))}
    </Table.Tr>
  ))
}

type BodyContentProps<T extends object> = Pick<
  DataTableProps<T>,
  'data' | 'columnsConfiguration' | 'rowKey'
>

function BodyContent<T extends object>({
  data,
  columnsConfiguration,
  rowKey,
}: BodyContentProps<T>) {
  return data.map((rowData) => (
    <Table.Tr key={rowData[rowKey] as React.Key}>
      {columnsConfiguration.map(({ key, renderRow }) => (
        <Table.Td key={key as React.Key}>
          {/* @ts-expect-error funciona bien */}
          {renderRow(rowData[key], rowData)}
        </Table.Td>
      ))}
    </Table.Tr>
  ))
}
