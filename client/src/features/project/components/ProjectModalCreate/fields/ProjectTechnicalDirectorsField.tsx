import { FormSectionHeader } from '../FormSectionHeader'
import { Professional } from '../Professional'

export function ProjectTechnicalDirectorsField() {
  return (
    <>
      <FormSectionHeader
        title="Dirección técnica"
        rightSection={
          <FormSectionHeader.AddButton
            onClick={() => console.log('dirección técnica')}
          />
        }
      />
      <Professional title="Dirección técnica" />
    </>
  )
}
