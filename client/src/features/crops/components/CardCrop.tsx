import type { CropWithUrl } from '@Common/api'
import type { CardProps, ElementProps } from '@mantine/core'

import { Badge, Box, Card, Group, Image, Skeleton, Text } from '@mantine/core'

import { displayCropSpecialty } from '@Crops/utils/displayCropSpecialty'

import { TagsList } from './TagsList'

type CardCropProps = {
  crop: CropWithUrl
  cardProps?: CardProps & ElementProps<'div', keyof CardProps>
}

export function CardCrop({ crop, cardProps }: CardCropProps) {
  return (
    <Card shadow="sm" padding="6" radius="md" withBorder {...cardProps}>
      <Box pos="relative" mb={4}>
        <Image src={crop.url} height={150} radius="sm" />
        <Badge
          pos="absolute"
          bottom={4}
          right={4}
          radius="sm"
          color="dark"
          size="md"
          px={4}
          pb={2}
        >
          {crop.scale}
        </Badge>
      </Box>

      <Text fw={700} mb={0} lineClamp={2}>
        {crop.name}
      </Text>
      <Text fz="sm" c="dimmed" lh={1.3} mt={-4} mb={4} tt="capitalize">
        {displayCropSpecialty(crop.specialty)}
      </Text>
      <TagsList tags={crop.tags} innerProps={{ container: { mah: 46 } }} />
    </Card>
  )
}

CardCrop.Loading = function CardCropLoading() {
  return (
    <Card shadow="sm" padding="6" radius="md" withBorder>
      <Box pos="relative" mb={4}>
        <Skeleton h={150} />
      </Box>

      <Skeleton h={24} w="80%" mb={2} />
      <Skeleton h={16} w="40%" mb={4} />
      <Group gap={4}>
        <Skeleton h={18} w="22%" />
        <Skeleton h={18} w="36%" />
        <Skeleton h={18} w="27%" />
      </Group>
    </Card>
  )
}
