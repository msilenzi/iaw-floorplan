import { useCallback, useEffect, useState } from 'react'

import { convertToPixelCrop } from 'react-image-crop'

import {
  Flex,
  Grid,
  Group,
  Modal,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'

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

  const handleCanvasClick = useCallback(() => {
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (blob) {
        const blobUrl = URL.createObjectURL(blob)
        window.open(blobUrl, '_blank')
      }
    }, 'image/png')
  }, [canvas])

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Crear recorte"
      styles={{ title: { fontWeight: 700 } }}
      size="xl"
    >
      <Grid>
        <Grid.Col span={{ base: 12, sm: 5 }} order={{ base: 2, sm: 1 }}>
          <CropFormCreate canvas={canvas} image={image} onClose={onClose} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 7 }} order={{ base: 1, sm: 2 }}>
          <Flex
            justify="center"
            align="center"
            w="100%"
            pos="relative"
            onClick={handleCanvasClick}
            style={(theme) => ({
              cursor: 'pointer',
              borderRadius: theme.radius.sm,
            })}
            bg="dark.6"
          >
            <canvas
              ref={setCanvas}
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: theme.radius.sm,
              }}
              role="link"
              tabIndex={0}
            />

            <Paper pos="absolute" top={8} right={8} p={2} ps={4} withBorder>
              <Group gap={4}>
                <Text span fz="sm">
                  Ampliar
                </Text>
                <IconExternalLink size={20} stroke={1.75} display="block" />
              </Group>
            </Paper>
          </Flex>
        </Grid.Col>
      </Grid>
    </Modal>
  )
}
