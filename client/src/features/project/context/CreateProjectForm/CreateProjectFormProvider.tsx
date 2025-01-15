import { isNotEmpty, useForm } from '@mantine/form'

import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { useOrganizationStore } from '@Organization/store/useOrganizationStore'

import { CreateProjectForm } from '../../types/form.types'
import { CreateProjectFormContext } from './CreateProjectFormContext'

type CreateProjectFormProviderProps = {
  children: React.ReactNode
}

export function CreateProjectFormProvider({
  children,
}: CreateProjectFormProviderProps) {
  const organizationId = useOrganizationStore((s) => s.organizationId)
  const { data } = useOrganizationQuery(organizationId)

  const form = useForm<CreateProjectForm>({
    mode: 'uncontrolled',
    validateInputOnBlur: true,

    initialValues: {
      record: '',
      name: '',
      type: undefined,
      purpose: undefined,
      location: '',
      status: undefined,
      background: '',
      references: [],
      otherRequirements: undefined,
      ownerEnabled: false,
      owner: undefined,
      designers: [],
      technicalDirectors: [],
    },

    transformValues: (values) => ({
      record: values.record.trim(),
      name: trimmedStrOrUndef(values.name!),
      type: values.type,
      purpose: values.purpose,
      location: trimmedStrOrUndef(values.location!),
      status: values.status ?? undefined,
      background: trimmedStrOrUndef(values.background!),
      // TODO:
      references: values.references,
      otherRequirements: values.otherRequirements,
      ownerEnabled: values.ownerEnabled,
      owner: values.owner,
      designers: values.designers,
      technicalDirectors: values.technicalDirectors,
    }),

    validate: {
      record(value) {
        if (value.trim().length === 0) {
          return 'El expediente es obligatorio'
        } else if (!new RegExp(data!.recordRegex).test(value.trim())) {
          return 'El expediente debe respetar el formato definido para la organización'
        }
        return null
      },

      // name

      type: isNotEmpty('El tipo de obra es obligatorio'),

      purpose: isNotEmpty('El destino de la obra es obligatorio'),

      // location
      // status
      // background
    },
  })

  return (
    <CreateProjectFormContext.Provider value={form}>
      {children}
    </CreateProjectFormContext.Provider>
  )
}

function trimmedStrOrUndef(value: string): string | undefined {
  return value.trim().length > 0 ? value.trim() : undefined
}
