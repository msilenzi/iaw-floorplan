import { isAxiosError } from 'axios'

import { Link, useNavigate } from '@tanstack/react-router'
import { Modal } from '@mantine/core'

import { isDuplicatedRecordException } from '@Common/api'
import { useNotifications } from '@Common/hooks/useNotifications'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import {
  CreateProjectFormProvider,
  useCreateProjectForm,
} from '@Project/context/CreateProjectForm'
import { useCreateProjectMutation } from '@Project/hooks/useCreateProjectMutation'

import { ProjectModalCreateBody } from './modal-sections/ProjectModalCreateBody'
import { ProjectModalCreateHeader } from './modal-sections/ProjectModalCreateHeader'

type ProjectModalCreateProps = {
  isOpen: boolean
  onClose: () => void
}

export function ProjectModalCreate(props: ProjectModalCreateProps) {
  return (
    <CreateProjectFormProvider>
      <Content {...props} />
    </CreateProjectFormProvider>
  )
}

function Content({ isOpen, onClose }: ProjectModalCreateProps) {
  const { organizationId } = useCurrentOrganization()

  const { mutateAsync, isPending } = useCreateProjectMutation(organizationId)
  const navigate = useNavigate()

  const form = useCreateProjectForm()

  const { showErrorNotification } = useNotifications()

  function handleClose() {
    if (isPending) return
    onClose()
  }

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const resp = await mutateAsync(values)
      void navigate({
        to: '/project/$organizationId/$projectId',
        params: { organizationId, projectId: resp._id },
      })
    } catch (error) {
      if (
        isAxiosError(error) &&
        isDuplicatedRecordException(error.response?.data)
      ) {
        const e = error.response.data
        form.setFieldError(
          'record',
          <>
            {e.message}. Hacé{' '}
            <Link
              to="/project/$organizationId/$projectId"
              params={{ organizationId, projectId: e.data.existingProjectId }}
              style={{ color: 'inherit' }}
            >
              click acá
            </Link>{' '}
            para ver el proyecto
          </>,
        )
      } else {
        const errorResponse = getErrorResponse(error, {
          title: 'No pudimos crear el proyecto',
        })
        showErrorNotification(errorResponse)
      }
    }
  })

  return (
    <Modal.Root opened={isOpen} onClose={handleClose} fullScreen>
      <form onSubmit={handleSubmit}>
        <fieldset
          style={{ border: 'none', padding: 0, margin: 0 }}
          disabled={isPending}
        >
          <Modal.Content bg="dark.8">
            <ProjectModalCreateHeader
              handleClose={handleClose}
              isLoading={isPending}
            />
            <ProjectModalCreateBody />
          </Modal.Content>
        </fieldset>
      </form>
    </Modal.Root>
  )
}
