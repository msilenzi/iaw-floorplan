import { convertToPixelCrop } from 'react-image-crop'

import { Group, Stack } from '@mantine/core'
import { IconScissors } from '@tabler/icons-react'

import { useNotifications } from '@Common/hooks/useNotifications'
import { PrimaryButton } from '@Common/ui/PrimaryButton'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'
import { useImageViewer } from '@Resources/context/ImageViewer'
import { CropFormProvider, useCropForm } from '@Crops/context/CropForm'
import { useCreateCropMutation } from '@Crops/hooks/useCreateCropMutation'
import { convertCanvasToPng } from '@Crops/utils/convertCanvasToPng'

import { CropFormFields } from './CropFormFields'

type CropFormCreateProps = {
  canvas: HTMLCanvasElement | null
  image: HTMLImageElement | null
  onClose: () => void
}

export function CropFormCreate(props: CropFormCreateProps) {
  return (
    <CropFormProvider>
      <Content {...props} />
    </CropFormProvider>
  )
}

function Content({ canvas, image, onClose }: CropFormCreateProps) {
  const { resourceId } = useCurrentResource()
  const { crop, clearCrop } = useImageViewer()
  const form = useCropForm()

  const { mutateAsync, isPending } = useCreateCropMutation()
  const { showErrorNotification, showSuccessNotification } = useNotifications()

  const handleSubmit = form.onSubmit(async (values) => {
    if (!canvas || !image || !crop) return null

    const file = await convertCanvasToPng(canvas, `${values.name}.png`)

    if (file == null) {
      showErrorNotification({
        title: 'Ocurrió un error inesperado',
        message:
          'No pudimos crear la imagen del recorte. Por favor inténtalo de nuevo más tarde',
      })
      return
    }

    try {
      const { x, y, width, height } = convertToPixelCrop(
        crop,
        image.width,
        image.height,
      )

      await mutateAsync({
        resourceId,
        name: values.name,
        specialty: values.specialty!,
        tags: values.tags,
        file: file,
        dimensions: { x, y, width, height },
      })

      form.reset()
      clearCrop()
      onClose()

      showSuccessNotification({
        title: 'Recorte creado con éxito',
        message: 'El recorte fue creado correctamente',
      })
    } catch (error) {
      const errorResponse = getErrorResponse(error, {
        title: 'No pudimos crear el recorte',
      })
      showErrorNotification(errorResponse)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <fieldset
        style={{ border: 'none', padding: 0, margin: 0 }}
        disabled={isPending || canvas == null}
      >
        <Stack gap="md">
          <CropFormFields />
          <Group justify="end">
            <PrimaryButton
              type="submit"
              rightSection={<IconScissors height={16} width={16} stroke={2} />}
              loading={isPending}
            >
              Crear recorte
            </PrimaryButton>
          </Group>
        </Stack>
      </fieldset>
    </form>
  )
}
