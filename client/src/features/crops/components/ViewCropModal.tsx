import type { CropWithUrl } from '@Common/api'

import { useCallback } from 'react'

import { Flex, Grid, Group, Image, Modal, Paper, Text } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'

import { CropData } from './CropData'

type ViewCropModalProps = {
  crop: CropWithUrl | undefined
  isOpen: boolean
  onClose: () => void
}

export function ViewCropModal({ crop, isOpen, onClose }: ViewCropModalProps) {
  const handleClick = useCallback(() => {
    if (!crop) return
    window.open(crop.url, '_blank')
  }, [crop])

  if (!crop) return null

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Información del plano"
      styles={{ title: { fontWeight: 700 } }}
      size="xl"
    >
      <Grid>
        <Grid.Col span={{ base: 12, sm: 5 }} order={{ base: 2, sm: 1 }}>
          <CropData crop={crop} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 7 }} order={{ base: 1, sm: 2 }}>
          <Flex
            justify="center"
            align="center"
            w="100%"
            pos="relative"
            onClick={handleClick}
            style={(theme) => ({
              cursor: 'pointer',
              borderRadius: theme.radius.sm,
            })}
            bg="dark.6"
          >
            <Image
              radius="md"
              src={crop.url}
              mah={'70dvh'}
              fit="contain"
              flex={1}
            />

            <Paper pos="absolute" top={8} right={8} p={2} ps={4} withBorder>
              <Group gap={4}>
                <Text span fz="sm">
                  Ampliar
                </Text>
                <IconExternalLink size={20} stroke={1.75} display="block" />
              </Group>
            </Paper>
          </Flex>
        </Grid.Col>
      </Grid>
    </Modal>
  )
}
