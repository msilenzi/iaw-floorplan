import { AddFieldButton } from '../AddFieldButton'
import { Professional } from '../Professional'

export function ProjectDesignersField() {
  return (
    <>
      <AddFieldButton onClick={() => console.log('proyectista')}>
        Añadir proyectista
      </AddFieldButton>
      <Professional title="Proyectista" />
    </>
  )
}
