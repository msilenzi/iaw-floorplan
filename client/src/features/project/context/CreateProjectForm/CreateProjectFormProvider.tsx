import { isNotEmpty, useForm } from '@mantine/form'

import {
  CreateProjectDto,
  ProjectPurpose,
  ProjectType,
} from '@Common/api/generated'

import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { useOrganizationStore } from '@Organization/store/useOrganizationStore'

import {
  CreateProjectForm,
  IdentificationType,
  ProjectProfessionalForm,
} from '../../types/form.types'
import { CreateProjectFormContext } from './CreateProjectFormContext'

type CreateProjectFormProviderProps = {
  children: React.ReactNode
}

export function CreateProjectFormProvider({
  children,
}: CreateProjectFormProviderProps) {
  const organizationId = useOrganizationStore((s) => s.organizationId)
  const { data } = useOrganizationQuery(organizationId)

  const form = useForm<
    CreateProjectForm,
    (values: CreateProjectForm) => CreateProjectDto
  >({
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
      type: values.type as ProjectType,
      purpose: values.purpose as ProjectPurpose,
      location: trimmedStrOrUndef(values.location),
      status: values.status ?? undefined,
      background: trimmedStrOrUndef(values.background),
      references:
        values.references.length !== 0
          ? values.references
              .map((value) => trimmedStrOrUndef(value))
              .filter((value) => value != undefined)
          : undefined,
      otherRequirements: values.otherRequirements,
      owner: values.ownerEnabled
        ? {
            fullName: values.owner.fullName.trim(),
            dni: values.owner.dni.trim(),
            address: trimmedStrOrUndef(values.owner.address),
          }
        : undefined,

      designers: values.designers.map(
        (value) =>
          ({
            fullName: value.fullName.trim(),
            dniCuit: value.dniCuit.trim(),
            address: trimmedStrOrUndef(value.address),
            provinceRegistration: trimmedStrOrUndef(value.provinceRegistration),
            cityRegistration: trimmedStrOrUndef(value.cityRegistration),
          }) as ProjectProfessionalForm,
      ),

      technicalDirectors: values.technicalDirectors.map(
        (value) =>
          ({
            fullName: value.fullName.trim(),
            dniCuit: value.dniCuit.trim(),
            address: trimmedStrOrUndef(value.address),
            provinceRegistration: trimmedStrOrUndef(value.provinceRegistration),
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

          // Esta versión solo marca las claves duplicadas posteriores.
          // Si es la primera vez que aparece no la marca como duplicada:
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
          if (!/^\d{8}$/.test(value)) {
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
          if (
            identificationType === IdentificationType.DNI &&
            !/\d{8}/.test(value)
          ) {
            return 'El DNI debe tener 8 dígitos'
          }
          if (
            identificationType === IdentificationType.CUIT &&
            !/^\d{2}-\d{8}-\d$/.test(value)
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
          if (
            identificationType === IdentificationType.DNI &&
            !/\d{8}/.test(value)
          ) {
            return 'El DNI debe tener 8 dígitos'
          }
          if (
            identificationType === IdentificationType.CUIT &&
            !/^\d{2}-\d{8}-\d$/.test(value)
          ) {
            return 'CUIT inválido'
          }
          return null
        },
      },
    },
  })

  return (
    <CreateProjectFormContext.Provider value={form}>
      {children}
    </CreateProjectFormContext.Provider>
  )
}

function trimmedStrOrUndef(value: string): string | undefined {
  const trimmedValue = value.trim()
  return trimmedValue.length !== 0 ? trimmedValue : undefined
}
