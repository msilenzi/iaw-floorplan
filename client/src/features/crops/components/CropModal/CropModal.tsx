import { Flex, Grid, Group, Modal, Paper, Text } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'

type CropModalProps = {
  isOpen: boolean
  onClose: () => void
  content: React.ReactNode
  preview: React.ReactNode
  onPreviewClick: () => void
}

export function CropModal({
  isOpen,
  onClose,
  content,
  preview,
  onPreviewClick,
}: CropModalProps) {
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
          {content}
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 7 }} order={{ base: 1, sm: 2 }}>
          <Flex
            justify="center"
            align="center"
            w="100%"
            pos="relative"
            onClick={onPreviewClick}
            style={(theme) => ({
              cursor: 'pointer',
              borderRadius: theme.radius.sm,
            })}
            bg="dark.6"
          >
            {preview}
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
