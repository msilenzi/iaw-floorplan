import {
  ActionIcon,
  CopyButton,
  Group,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'

import { IconCopy, IconCopyCheck, IconUserPlus } from '@tabler/icons-react'

import AccordionDataContainer from '@Common/ui/AccordionDataContainer'

import { useOrganizationStore } from '@Organization/store/useOrganizationStore'

export function InvitationCode() {
  const organizationId = useOrganizationStore((state) => state.organizationId)

  return (
    <AccordionDataContainer title="Invita a otros usuarios" Icon={IconUserPlus}>
      <Text mb="xs" mt="xs">
        Comparta el siguiente código para que otras personas puedan unirse:
      </Text>
      <Group align="center" justify="start" gap="xs">
        <Title order={3} ff="monospace">
          {organizationId}
        </Title>
        <CopyButton value={organizationId ?? ''}>
          {({ copied, copy }) => (
            <Tooltip
              color="dark"
              label={copied ? 'Copiado' : 'Copiar'}
              position="right"
            >
              <ActionIcon
                variant="transparent"
                color={copied ? 'teal.6' : 'dark.1'}
                onClick={copy}
              >
                {copied ? <IconCopyCheck /> : <IconCopy />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Group>
    </AccordionDataContainer>
  )
}
