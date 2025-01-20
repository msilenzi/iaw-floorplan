import { FormProvider, useForm } from './MemberSearchFormContext'

type MemberSearchFormProviderProps = {
  children: React.ReactNode
}

export function MemberSearchFormProvider({
  children,
}: MemberSearchFormProviderProps) {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      searchValue: '',
      searchField: 'name',
    },
  })

  return <FormProvider form={form}>{children}</FormProvider>
}
