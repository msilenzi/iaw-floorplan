import type { PercentCrop, ReactCrop } from 'react-image-crop'

export type ImageViewerState = {
  crop: PercentCrop | undefined
  scale: number

  zoomIn: () => void
  zoomOut: () => void
  zoomReset: () => void
  onCropChange: React.ComponentProps<typeof ReactCrop>['onChange']

  imageRef: React.RefObject<HTMLImageElement>
}
