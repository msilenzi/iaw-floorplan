import { createFileRoute } from '@tanstack/react-router'
import { Flex, Stack } from '@mantine/core'

import { InfoDesigners } from '@Project/components/info/InfoDesigners'
import { InfoGeneralInformation } from '@Project/components/info/InfoGeneralInformation'
import { InfoOtherRequirements } from '@Project/components/info/InfoOtherRequirements'
import { InfoOwner } from '@Project/components/info/InfoOwner'
import { InfoReferences } from '@Project/components/info/InfoReferences'
import { InfoTechnicalDirectors } from '@Project/components/info/InfoTechnicalDirectors'

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
