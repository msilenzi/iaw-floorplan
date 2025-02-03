import { Button } from '@mantine/core'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'

import { useImageViewer } from '@Resources/context/ImageViewer'

export function ToggleShowCropsButton() {
  const { showCrops, toggleShowCrops } = useImageViewer()

  const Icon = showCrops ? IconEye : IconEyeClosed

  return (
    <Button
      variant="default"
      pos="absolute"
      bottom={20}
      left={20}
      size="xs"
      onClick={toggleShowCrops}
      rightSection={<Icon height={14} width={14} stroke={1.75} />}
      style={{
        color: showCrops ? undefined : 'var(--mantine-color-dark-1)',
      }}
    >
      Recortes
    </Button>
  )
}
