import { Box, Button } from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'

import { useImageViewer } from '@ProjectResources/context/ImageViewer'

export function ZoomButtons() {
  const { scale, zoomIn, zoomOut, zoomReset } = useImageViewer()

  return (
    <Box pos="absolute" bottom={20} right={20}>
      <Button.Group w={160}>
        <Button variant="default" size="xs" onClick={zoomOut}>
          <IconMinus height={16} width={16} stroke={2} />
        </Button>
        <Button variant="default" size="xs" onClick={zoomReset} flex={1}>
          {Math.floor(100 * scale)} %
        </Button>
        <Button variant="default" size="xs" onClick={zoomIn}>
          <IconPlus height={16} width={16} stroke={2} />
        </Button>
      </Button.Group>
    </Box>
  )
}
