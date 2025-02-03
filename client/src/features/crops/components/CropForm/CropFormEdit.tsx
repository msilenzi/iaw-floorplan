import type { CropWithUrl } from '@Common/api'

import { useEffect } from 'react'

import { Button, Group, Stack } from '@mantine/core'
import { IconPencil, IconReload, IconX } from '@tabler/icons-react'

import { useNotifications } from '@Common/hooks/useNotifications'
import { PrimaryButton } from '@Common/ui/PrimaryButton'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { CropFormProvider, useCropForm } from '@Crops/context/CropForm'
import { useEditCropMutation } from '@Crops/hooks/useEditCropMutation'

import { CropFormFields } from './CropFormFields'

type CropFormEditProps = {
  crop: CropWithUrl
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedCrop: React.Dispatch<React.SetStateAction<CropWithUrl | undefined>>
}

export function CropFormEdit(props: CropFormEditProps) {
  return (
    <CropFormProvider>
      <Content {...props} />
    </CropFormProvider>
  )
}

function Content({ crop, setIsEditing, setSelectedCrop }: CropFormEditProps) {
  const { mutateAsync, isPending } = useEditCropMutation(crop._id)

  const { showErrorNotification, showSuccessNotification } = useNotifications()

  const form = useCropForm()

  useEffect(() => {
    form.initialize(crop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crop])

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await mutateAsync({
        ...values,
        specialty: values.specialty ?? undefined,
      })
      form.setInitialValues(values)
      form.reset()

      setSelectedCrop((prev) => {
        if (!prev || !values.specialty) return prev
        return { ...prev, ...values, specialty: values.specialty }
      })
      setIsEditing(false)
      showSuccessNotification({
        title: 'Recorte actualizado con éxito',
        message: 'El recorte fue actualizado correctamente',
      })
    } catch (error) {
      const errorResponse = getErrorResponse(error, {
        title: 'No pudimos actualizar el recorte',
      })
      showErrorNotification(errorResponse)
    }
  })

  return (
    <form onSubmit={handleSubmit} onReset={() => form.reset()}>
      <fieldset
        style={{ border: 'none', padding: 0, margin: 0 }}
        disabled={isPending}
      >
        <Stack gap="md">
          <CropFormFields />
          <Group mt="xs">
            <Button
              color="dark.5"
              flex={1}
              rightSection={<IconX size={16} stroke={2.5} />}
              loading={isPending}
              disabled={isPending}
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </Button>

            <Button
              type="reset"
              color="dark.5"
              flex={1}
              rightSection={<IconReload size={16} stroke={2.5} />}
              loading={isPending}
              disabled={isPending || !form.isDirty()}
            >
              Restablecer
            </Button>
          </Group>
          <PrimaryButton
            type="submit"
            rightSection={<IconPencil height={16} width={16} stroke={2} />}
            loading={isPending}
            disabled={isPending || !form.isDirty()}
          >
            Editar recorte
          </PrimaryButton>
        </Stack>
      </fieldset>
    </form>
  )
}
