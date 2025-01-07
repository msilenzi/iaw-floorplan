import type {
  MantineSize,
  TableProps,
  TableTdProps,
  TableThProps,
  TableTrProps,
} from '@mantine/core'

export type DataColumnConfiguration<
  TData extends object,
  K extends keyof TData = keyof TData,
> = K extends keyof TData
  ? {
      key: K
      label: string
      hideBreakpoint?: MantineSize
      props?: {
        th?: TableThProps
        td?: TableTdProps | ((rowData: TData) => TableTdProps)
      }
      renderRow: (value: TData[K], rowData: TData) => React.ReactNode
    }
  : never

export type ColumnsConfiguration<TData extends object> = Array<
  { [K in keyof TData]: DataColumnConfiguration<TData, K> }[keyof TData]
>

export type DataTableProps<TData extends object> = {
  data: TData[]
  columnsConfiguration: DataColumnConfiguration<TData>[]
  isLoading: boolean
  loadingRowsLength: number
  rowKey: keyof TData
  props?: {
    table?: TableProps
    tr?: TableTrProps | ((rowData: TData) => TableTrProps)
  }
}