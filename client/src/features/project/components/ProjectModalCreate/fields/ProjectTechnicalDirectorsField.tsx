import { AddFieldButton } from '../AddFieldButton'
import { Professional } from '../Professional'

export function ProjectTechnicalDirectorsField() {
  return (
    <>
      <AddFieldButton onClick={() => console.log('dirección técnica')}>
        Añadir dirección técnica
      </AddFieldButton>
      <Professional title="Dirección técnica" />
    </>
  )
}
