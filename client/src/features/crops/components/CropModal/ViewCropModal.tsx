import type { CropWithUrl } from '@Common/api'

import { useCallback, useState } from 'react'

import { Image } from '@mantine/core'

import { CropData } from '../CropData'
import { CropFormEdit } from '../CropForm/CropFormEdit'
import { CropModal } from './CropModal'

type ViewCropModalProps = {
  crop: CropWithUrl | undefined
  isOpen: boolean
  onClose: () => void
  setSelectedCrop: React.Dispatch<React.SetStateAction<CropWithUrl | undefined>>
}

export function ViewCropModal({
  crop,
  isOpen,
  onClose,
  setSelectedCrop,
}: ViewCropModalProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleClick = useCallback(() => {
    if (!crop) return
    window.open(crop.url, '_blank')
  }, [crop])

  const handleClose = useCallback(() => {
    setIsEditing(false)
    onClose()
  }, [onClose])

  if (!crop) return null

  const Content = isEditing ? CropFormEdit : CropData

  return (
    <CropModal
      isOpen={isOpen}
      onClose={handleClose}
      content={
        <Content
          crop={crop}
          setIsEditing={setIsEditing}
          setSelectedCrop={setSelectedCrop}
        />
      }
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
