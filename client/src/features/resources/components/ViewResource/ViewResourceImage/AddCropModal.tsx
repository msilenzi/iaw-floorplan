import { useEffect, useState } from 'react'

import { convertToPixelCrop } from 'react-image-crop'

import { Box, Grid, Modal, useMantineTheme } from '@mantine/core'

import { useImageViewer } from '@Resources/context/ImageViewer'
import { canvasPreview } from '@Resources/utils/canvasPreview'
import { CropFormCreate } from '@Crops/components/CropForm/CropFormCreate'

type AddCropModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function AddCropModal({ isOpen, onClose }: AddCropModalProps) {
  const theme = useMantineTheme()
  const { crop, imageRef } = useImageViewer()
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  const image = imageRef.current

  useEffect(() => {
    if (isOpen && image && crop && canvas) {
      const pixelCrop = convertToPixelCrop(crop, image.width, image.height)
      canvas.width = pixelCrop.width
      canvas.height = pixelCrop.height
      canvasPreview(image, canvas, pixelCrop)
    }
  }, [canvas, crop, image, isOpen])

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Crear recorte"
      styles={{ title: { fontWeight: 700 } }}
      size="xl"
    >
      <Grid>
        <Grid.Col span={5}>
          <CropFormCreate canvas={canvas} image={image} />
        </Grid.Col>
        <Grid.Col span={7}>
          <Box
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <canvas
              ref={setCanvas}
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: theme.radius.sm,
              }}
            />
          </Box>
        </Grid.Col>
      </Grid>
    </Modal>
  )
}
