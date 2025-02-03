import type { ProjectUpdateDto } from '@Common/api'

import { useEffect } from 'react'

import { isAxiosError } from 'axios'

import { Link } from '@tanstack/react-router'
import { Modal } from '@mantine/core'

import { isDuplicatedRecordException } from '@Common/api'
import { useNotifications } from '@Common/hooks/useNotifications'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useCurrentProject } from '@Project/context/CurrentProject'
import {
  ProjectFormProvider,
  useProjectForm,
} from '@Project/context/ProjectForm'
import { useEditProjectMutation } from '@Project/hooks/useEditProjectMutation'
import { useProjectQuery } from '@Project/hooks/useProjectQuery'
import { initializeForm } from '@Project/utils/initializeForm'

import { ProjectModalBody } from './modal-sections/ProjectModalBody'
import { ProjectModalEditHeader } from './modal-sections/ProjectModalEditHeader'

type ProjectModalEditProps = {
  isOpen: boolean
  onClose: () => void
}

export function ProjectModalEdit(props: ProjectModalEditProps) {
  return (
    <ProjectFormProvider
      formOptions={{
        enhanceGetInputProps: (payload) => {
          if (!payload.form.initialized) return { disabled: true }
          return {}
        },
      }}
    >
      <Content {...props} />
    </ProjectFormProvider>
  )
}

function Content({ isOpen, onClose }: ProjectModalEditProps) {
  const { organizationId } = useCurrentOrganization()
  const { projectId } = useCurrentProject()
  const { data } = useProjectQuery()

  const { mutateAsync, isPending } = useEditProjectMutation(
    organizationId,
    projectId,
  )

  const { showErrorNotification } = useNotifications()

  const form = useProjectForm()

  useEffect(() => {
    if (data) {
      form.initialize(initializeForm(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  function handleClose() {
    if (!isPending) onClose()
  }

  const handleSubmit = form.onSubmit(async (values) => {
    if (data == undefined) return

    try {
      const ownerValue: () => ProjectUpdateDto['owner'] = () => {
        if (!form.getValues().ownerEnabled) return data.owner ? null : undefined
        if (!data.owner || form.isDirty('owner')) return values.owner
        return undefined
      }

      // null: eliminar,
      // undefined: no modificado
      // value: actualizar
      const modifiedValues: ProjectUpdateDto = {
        record: form.isDirty('record') ? values.record : undefined,
        name: form.isDirty('name') ? (values.name ?? null) : undefined,
        type: form.isDirty('type') ? values.type : undefined,
        purpose: form.isDirty('purpose') ? values.purpose : undefined,
        location: form.isDirty('location')
          ? (values.location ?? null)
          : undefined,
        status: form.isDirty('status') ? (values.status ?? null) : undefined,
        background: form.isDirty('background')
          ? (values.background ?? null)
          : undefined,
        references:
          values.references == undefined
            ? data.references && data.references.length !== 0
              ? null
              : undefined
            : form.isDirty('references')
              ? values.references
              : undefined,
        otherRequirements:
          values.otherRequirements == undefined
            ? data.otherRequirements && data.otherRequirements.length !== 0
              ? null
              : undefined
            : form.isDirty('otherRequirements')
              ? values.otherRequirements
              : undefined,
        owner: ownerValue(),
        designers:
          values.designers == undefined
            ? data.designers && data.designers.length !== 0
              ? null
              : undefined
            : form.isDirty('designers')
              ? values.designers
              : undefined,
        technicalDirectors:
          values.technicalDirectors == undefined
            ? data.technicalDirectors && data.technicalDirectors.length !== 0
              ? null
              : undefined
            : form.isDirty('technicalDirectors')
              ? values.technicalDirectors
              : undefined,
      }

      await mutateAsync(modifiedValues)
      form.setInitialValues(initializeForm(values))
      form.reset()
      onClose()
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
      <form onSubmit={handleSubmit} onReset={() => form.reset()}>
        <fieldset
          style={{ border: 'none', padding: 0, margin: 0 }}
          disabled={isPending}
        >
          <Modal.Content bg="dark.8">
            <ProjectModalEditHeader
              handleClose={handleClose}
              isLoading={isPending}
            />
            <ProjectModalBody />
          </Modal.Content>
        </fieldset>
      </form>
    </Modal.Root>
  )
}
