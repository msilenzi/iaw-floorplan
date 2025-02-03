import { useCallback, useEffect, useState } from 'react'

import { convertToPixelCrop } from 'react-image-crop'

import { useMantineTheme } from '@mantine/core'

import { useImageViewer } from '@Resources/context/ImageViewer'
import { canvasPreview } from '@Resources/utils/canvasPreview'

import { CropFormCreate } from '../CropForm/CropFormCreate'
import { CropModal } from './CropModal'

type CreateCropModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function CreateCropModal({ isOpen, onClose }: CreateCropModalProps) {
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
    <CropModal
      isOpen={isOpen}
      onClose={onClose}
      content={
        <CropFormCreate canvas={canvas} image={image} onClose={onClose} />
      }
      preview={
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
      }
      onPreviewClick={handleCanvasClick}
    />
  )
}
