import { createFileRoute } from '@tanstack/react-router'

import { Flex, Stack } from '@mantine/core'

import { InfoDesigners } from '@/features/project/components/info/InfoDesigners'
import { InfoGeneralInformation } from '@/features/project/components/info/InfoGeneralInformation'
import { InfoOtherRequirements } from '@/features/project/components/info/InfoOtherRequirements'
import { InfoOwner } from '@/features/project/components/info/InfoOwner'
import { InfoReferences } from '@/features/project/components/info/InfoReferences'
import { InfoTechnicalDirectors } from '@/features/project/components/info/InfoTechnicalDirectors'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/info',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Flex direction="row" wrap="wrap" gap="lg">
      <Stack flex={1} miw={350} gap="xl">
        <InfoGeneralInformation />
        <InfoReferences />
        <InfoOtherRequirements />
      </Stack>

      <Stack flex={1} miw={350} gap="xl">
        <InfoOwner />
        <InfoDesigners />
        <InfoTechnicalDirectors />
      </Stack>
    </Flex>
  )
}
