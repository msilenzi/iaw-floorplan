import type { CropWithUrl } from '@Common/api'

import { useCallback } from 'react'

import { Image } from '@mantine/core'

import { CropData } from '../CropData'
import { CropModal } from './CropModal'

type ViewCropModalProps = {
  crop: CropWithUrl | undefined
  isOpen: boolean
  onClose: () => void
}

export function ViewCropModal({ crop, isOpen, onClose }: ViewCropModalProps) {
  const handleClick = useCallback(() => {
    if (!crop) return
    window.open(crop.url, '_blank')
  }, [crop])

  if (!crop) return null

  return (
    <CropModal
      isOpen={isOpen}
      onClose={onClose}
      content={<CropData crop={crop} />}
      preview={
        <Image
          radius="md"
          src={crop.url}
          mah={'70dvh'}
          fit="contain"
          flex={1}
        />
      }
      onPreviewClick={handleClick}
    />
  )
}
