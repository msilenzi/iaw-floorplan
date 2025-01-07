import { MantineSize, StyleProp } from '@mantine/core'

export type DataColumnConfiguration<
  TData extends object,
  K extends keyof TData = keyof TData,
> = K extends keyof TData
  ? {
      key: K
      label: string
      width: StyleProp<React.CSSProperties['width']>
      hideBreakpoint?: MantineSize
      renderRow: (value: TData[K], values: TData) => React.ReactNode
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
}
