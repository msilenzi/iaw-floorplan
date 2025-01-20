import { createFormContext } from '@mantine/form'

type SearchField = 'name' | 'email'

type MemberSearchFormValues = {
  searchValue: string
  searchField: SearchField
}

export const [FormProvider, useMemberSearchForm, useForm] =
  createFormContext<MemberSearchFormValues>()
