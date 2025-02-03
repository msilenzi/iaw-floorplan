import type { CropWithUrl } from '@Common/api'

import { Badge, Box, rgba } from '@mantine/core'

type DrawCropProps = {
  crop: CropWithUrl
}

export function DrawCrop({ crop }: DrawCropProps) {
  return (
    <Box
      pos="absolute"
      top={`${crop.dimensions.y}%`}
      left={`${crop.dimensions.x}%`}
      h={`${crop.dimensions.height}%`}
      w={`${crop.dimensions.width}%`}
      style={(theme) => ({
        pointerEvents: 'none',
        backgroundColor: rgba(theme.colors.blue[3], 0.1),
        border: `2px solid ${theme.colors.blue[8]}`,
      })}
    >
      <Badge
        color="blue"
        pos="absolute"
        top="-2px"
        left="-2px"
        size="sm"
        style={{ borderRadius: 0, borderEndEndRadius: '4px' }}
      >
        {crop.name}
      </Badge>
    </Box>
  )
}
