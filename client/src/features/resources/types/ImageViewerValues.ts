import type { PercentCrop, ReactCrop } from 'react-image-crop'

export type ImageViewerState = {
  crop: PercentCrop | undefined
  scale: number
  showCrops: boolean

  zoomIn: () => void
  zoomOut: () => void
  zoomReset: () => void
  onCropChange: React.ComponentProps<typeof ReactCrop>['onChange']
  clearCrop: () => void
  toggleShowCrops: () => void

  imageRef: React.RefObject<HTMLImageElement>
}
