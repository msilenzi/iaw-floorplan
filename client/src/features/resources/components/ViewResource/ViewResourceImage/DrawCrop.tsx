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
        backgroundColor: rgba(theme.colors.blue[1], 0.1),
        border: `2px solid ${theme.colors.blue[8]}`,
        borderRadius: theme.radius.sm,
      })}
    >
      <Badge
        color="blue"
        pos="absolute"
        top="-2px"
        left="-2px"
        size="sm"
        style={(theme) => ({
          borderRadius: `${theme.radius.sm} 0`,
        })}
        styles={{
          label: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        }}
      >
        {crop.name}
      </Badge>
    </Box>
  )
}
