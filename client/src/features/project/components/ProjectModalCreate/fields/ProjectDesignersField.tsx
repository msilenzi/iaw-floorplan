import { FormSectionHeader } from '../FormSectionHeader'
import { Professional } from '../Professional'

export function ProjectDesignersField() {
  return (
    <>
      <FormSectionHeader
        title="Proyectistas"
        rightSection={
          <FormSectionHeader.AddButton
            onClick={() => console.log('proyectista')}
          />
        }
      />
      <Professional title="Proyectista" />
    </>
  )
}
