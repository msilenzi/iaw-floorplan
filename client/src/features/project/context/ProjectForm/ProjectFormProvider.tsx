import type { UseFormInput } from '@mantine/form'
import type {
  ProjectFormValues,
  ProjectProfessionalForm,
} from '@Project/types/ProjectForm.types'

import { isNotEmpty } from '@mantine/form'

import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { IdentificationType } from '@Project/types/ProjectForm.types'
import { isCuit } from '@Project/utils/isCuit'
import { isDni } from '@Project/utils/isDni'
import { trimmedStrOrUndef } from '@Project/utils/trimmedStrOrUndef'

import { FormProvider, useForm } from './ProjectFormContext'

type ProjectFormProviderProps = {
  children: React.ReactNode
  formOptions?: UseFormInput<
    ProjectFormValues,
    (values: ProjectFormValues) => unknown
  >
}

export function ProjectFormProvider({
  children,
  formOptions,
}: ProjectFormProviderProps) {
  const { data } = useOrganizationQuery()

  const form = useForm({
    ...formOptions,

    mode: 'uncontrolled',
    validateInputOnBlur: true, // Deshabilitar si hay problemas de rendimiento

    initialValues: {
      record: '',
      name: '',
      type: null,
      purpose: null,
      location: '',
      status: null,
      background: '',
      references: [],
      otherRequirements: [],
      ownerEnabled: false,
      owner: { fullName: '', dni: '', address: '' },
      designers: [],
      technicalDirectors: [],
    },

    transformValues: (values) => ({
      record: values.record.trim(),
      name: trimmedStrOrUndef(values.name),
      type: values.type!,
      purpose: values.purpose!,
      location: trimmedStrOrUndef(values.location),
      status: values.status ?? undefined,
      background: trimmedStrOrUndef(values.background),

      references:
        values.references.length === 0
          ? undefined
          : values.references
              .map((value) => trimmedStrOrUndef(value))
              .filter((value) => value != undefined),

      otherRequirements:
        values.otherRequirements.length === 0
          ? undefined
          : values.otherRequirements.map((value) => ({
              key: value.key.trim(),
              value: value.value.trim(),
            })),

      owner: !values.ownerEnabled
        ? undefined
        : {
            fullName: values.owner.fullName.trim(),
            dni: values.owner.dni.trim(),
            address: trimmedStrOrUndef(values.owner.address),
          },

      designers:
        values.designers.length === 0
          ? undefined
          : values.designers.map(
              (value) =>
                ({
                  fullName: value.fullName.trim(),
                  dniCuit: value.dniCuit.trim(),
                  address: trimmedStrOrUndef(value.address),
                  provinceRegistration: trimmedStrOrUndef(
                    value.provinceRegistration,
                  ),
                  cityRegistration: trimmedStrOrUndef(value.cityRegistration),
                }) as ProjectProfessionalForm,
            ),

      technicalDirectors:
        values.technicalDirectors.length === 0
          ? undefined
          : values.technicalDirectors.map(
              (value) =>
                ({
                  fullName: value.fullName.trim(),
                  dniCuit: value.dniCuit.trim(),
                  address: trimmedStrOrUndef(value.address),
                  provinceRegistration: trimmedStrOrUndef(
                    value.provinceRegistration,
                  ),
                  cityRegistration: trimmedStrOrUndef(value.cityRegistration),
                }) as ProjectProfessionalForm,
            ),
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

      type: isNotEmpty('El tipo de obra es obligatorio'),

      purpose: isNotEmpty('El destino de la obra es obligatorio'),

      otherRequirements: {
        key(value, values /* , path */) {
          const trimmedKey = value.trim()
          if (trimmedKey.length === 0) return 'La clave es obligatoria'

          const keyCount = values.otherRequirements.reduce(
            (count, { key }) => (key.trim() === trimmedKey ? count + 1 : count),
            0,
          )
          if (keyCount > 1) return `La clave '${trimmedKey}' está duplicada`
          return null

          // La siguiente versión solo marca las claves duplicadas posteriores,
          // si es la primera vez que aparece no la marca como duplicada:
          /*
            const reqmts = values.otherRequirements
            const keyPos: number = +path.split('.')[1]
            for (let i = keyPos - 1; i >= 0; i--) {
              const currKey = reqmts[i].key.trim()
              if (currKey === trimmedKey) {
                return `La clave '${currKey}' está duplicada`
              }
            }
            return null
          */
        },
        value: isNotEmpty('El valor es obligatorio'),
      },

      owner: {
        fullName(value, { ownerEnabled }) {
          if (!ownerEnabled) return null
          if (value.trim().length === 0) return 'El nombre es obligatorio'
          return null
        },
        dni(value, { ownerEnabled }) {
          if (!ownerEnabled) return null
          if (!isDni(value)) {
            return 'El DNI debe tener 8 dígitos'
          }
          return null
        },
      },

      designers: {
        fullName: isNotEmpty('El nombre es obligatorio'),

        dniCuit(value, values, path) {
          const index = +path.split('.')[1]
          const identificationType = values.designers[index].identificationType

          if (!Object.values(IdentificationType).includes(identificationType)) {
            return 'Tipo de documento inválido'
          }
          if (identificationType === IdentificationType.DNI && !isDni(value)) {
            return 'El DNI debe tener 8 dígitos'
          }
          if (
            identificationType === IdentificationType.CUIT &&
            !isCuit(value)
          ) {
            return 'CUIT inválido'
          }
          return null
        },
      },

      technicalDirectors: {
        fullName: isNotEmpty('El nombre es obligatorio'),

        dniCuit(value, values, path) {
          const index = +path.split('.')[1]
          const identificationType =
            values.technicalDirectors[index].identificationType

          if (!Object.values(IdentificationType).includes(identificationType)) {
            return 'Tipo de documento inválido'
          }
          if (identificationType === IdentificationType.DNI && !isDni(value)) {
            return 'El DNI debe tener 8 dígitos'
          }
          if (
            identificationType === IdentificationType.CUIT &&
            !isCuit(value)
          ) {
            return 'CUIT inválido'
          }
          return null
        },
      },
    },
  })

  return <FormProvider form={form}>{children}</FormProvider>
}
