import { Modal } from '@mantine/core'

import {
  CreateProjectFormProvider,
  useCreateProjectForm,
} from '../../context/CreateProjectForm'
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
  const form = useCreateProjectForm()

  function handleClose() {
    // TODO: si el formulario tiene campos editados mostrar una alerta
    onClose()
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    return form.onSubmit((values) => {
      console.log('create project submit', values)
    })(e)
  }

  return (
    <Modal.Root opened={isOpen} onClose={handleClose} fullScreen>
      <form onSubmit={handleSubmit}>
        <Modal.Content bg="dark.8">
          <ProjectModalCreateHeader handleClose={handleClose} />
          <ProjectModalCreateBody />
        </Modal.Content>
      </form>
    </Modal.Root>
  )
}
