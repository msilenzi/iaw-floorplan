import { convertToPixelCrop } from 'react-image-crop'

import { Group, Stack } from '@mantine/core'
import { IconScissors } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'
import { useImageViewer } from '@Resources/context/ImageViewer'
import { CropFormProvider, useCropForm } from '@Crops/context/CropForm'
import { useCreateCropMutation } from '@Crops/hooks/useCreateCropMutation'
import { convertCanvasToPng } from '@Crops/utils/convertCanvasToPng'

import { CropFormFields } from './CropFormFields'

type CropFormCreateProps = {
  canvas: HTMLCanvasElement | null
  image: HTMLImageElement | null
}

export function CropFormCreate(props: CropFormCreateProps) {
  return (
    <CropFormProvider>
      <Content {...props} />
    </CropFormProvider>
  )
}

function Content({ canvas, image }: CropFormCreateProps) {
  const { resourceId } = useCurrentResource()
  const { crop } = useImageViewer()
  const form = useCropForm()

  const { mutateAsync, isPending } = useCreateCropMutation()

  const handleSubmit = form.onSubmit(async (values) => {
    console.log('handle submit')

    if (!canvas || !image || !crop) return null

    const file = await convertCanvasToPng(canvas, `${values.name}.png`)

    if (file == null) {
      // TODO: Mostrar un error como la gente
      console.log('no hay un cropfile!!!')
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
    } catch (error) {
      // TODO: manejar el error
      console.log('algo salió mal')
      throw error
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
            >
              Crear recorte
            </PrimaryButton>
          </Group>
        </Stack>
      </fieldset>
    </form>
  )
}
