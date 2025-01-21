import type { UseFormReturnType } from '@mantine/form'

import { useCallback, useState } from 'react'

import { randomId } from '@mantine/hooks'

type UseKeyedArrayFormFieldProps<
  TForm,
  KField extends keyof TForm = keyof TForm,
> = KField extends keyof TForm
  ? TForm[KField] extends Array<infer TField>
    ? {
        form: UseFormReturnType<TForm, (values: TForm) => unknown>
        fieldName: KField
        initialValue: TField
      }
    : never
  : never

export function useKeyedArrayFormField<T>({
  form,
  fieldName,
  initialValue,
}: UseKeyedArrayFormFieldProps<T>) {
  const [ids, setIds] = useState<string[]>(() => {
    const currentValues = form.getValues()[fieldName] ?? []

    if (!Array.isArray(currentValues)) {
      throw new Error(`${fieldName.toString()} is not an array`)
    }

    return Array.from({ length: currentValues.length }).map(() => randomId())
  })

  const addItem = useCallback(() => {
    form.insertListItem(fieldName, initialValue)
    setIds((prev) => [...prev, randomId()])
  }, [fieldName, form, initialValue])

  const removeItem = useCallback(
    (index: number) => {
      form.removeListItem(fieldName, index)
      setIds((prev) => prev.filter((_, i) => i !== index))
    },
    [fieldName, form],
  )

  return {
    ids,
    addItem,
    removeItem,
  }
}
