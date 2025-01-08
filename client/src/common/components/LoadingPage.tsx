import { Box, Group, Loader } from '@mantine/core'

import { LoadingHeader } from './Header'

export function LoadingPage() {
  return (
    <Box h="100dvh" bg="dark.8">
      <LoadingHeader />
      <Group mt={'20dvh'} w="100%" justify="center">
        <Loader size={'6rem'} color="dark.5" />
      </Group>
    </Box>
  )
}
