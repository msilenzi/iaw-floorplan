import { Button } from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'

import { useImageViewer } from '@Resources/context/ImageViewer'

export function ZoomButtons() {
  const { scale, zoomIn, zoomOut, zoomReset } = useImageViewer()

  return (
    <Button.Group>
      <Button variant="default" size="xs" onClick={zoomOut}>
        <IconMinus height={16} width={16} stroke={2} />
      </Button>
      <Button variant="default" size="xs" onClick={zoomReset} flex={1}>
        {Math.round(100 * scale)} %
      </Button>
      <Button variant="default" size="xs" onClick={zoomIn}>
        <IconPlus height={16} width={16} stroke={2} />
      </Button>
    </Button.Group>
  )
}
