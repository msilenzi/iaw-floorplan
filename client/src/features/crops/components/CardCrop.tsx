import type { CropWithUrl } from '@Common/api'

import { Badge, Box, Card, Group, Image, Skeleton, Text } from '@mantine/core'

import { displayCropSpecialty } from '@Crops/utils/displayCropSpecialty'

type CardCropProps = {
  crop: CropWithUrl
}

export function CardCrop({ crop }: CardCropProps) {
  return (
    <Card shadow="sm" padding="6" radius="md" withBorder>
      <Box pos="relative" mb={4}>
        <Image src={crop.url} height={150} radius="sm" />
        <Badge
          pos="absolute"
          bottom={4}
          right={4}
          radius="sm"
          color="dark"
          size="md"
        >
          {crop.scale}
        </Badge>
      </Box>

      <Text fw={700} mb={0}>
        {crop.name}
      </Text>
      <Text fz="sm" c="dimmed" lh={1.3} mt={-4} mb={4} tt="capitalize">
        {displayCropSpecialty(crop.specialty)}
      </Text>
      <Group gap={4}>
        {crop.tags.map((tag, i) => (
          <Badge radius="sm" color="dark.7" c="dark.1" key={i} size="sm">
            {tag}
          </Badge>
        ))}
      </Group>
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
