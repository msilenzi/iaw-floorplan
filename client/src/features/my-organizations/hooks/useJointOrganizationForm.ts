import { useForm } from '@mantine/form'

import { isMongoId } from '@Common/utils/validators/isMongoId'

type JointOrganizationForm = {
  organizationId: string
}

export function useJointOrganizationForm() {
  return useForm<JointOrganizationForm>({
    mode: 'controlled',
    initialValues: {
      organizationId: '',
    },
    transformValues: (values) => ({
      organizationId: values.organizationId.trim().toLowerCase(),
    }),
    validate: {
      organizationId: (value) => {
        const id = value.trim().toLowerCase()
        if (id.length === 0) {
          return 'El código es obligatorio'
        }
        if (!isMongoId(id)) {
          return 'El código tiene un formato inválido'
        }
        return null
      },
    },
    validateInputOnChange: true,
  })
}
