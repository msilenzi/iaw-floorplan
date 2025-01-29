import type { ProjectProfessional } from '@Common/api'

import { Fragment } from 'react'

import { Box, Divider, Group, Stack } from '@mantine/core'

import { useCurrentProject } from '@Project/context/CurrentProject'
import { useProjectQuery } from '@Project/hooks/useProjectQuery'
import { isDni } from '@Project/utils/isDni'

import { InfoItem } from './InfoItem'

type InfoProfessionalsProps = {
  professionals?: ProjectProfessional[]
}

export function InfoProfessionals({ professionals }: InfoProfessionalsProps) {
  const { projectId } = useCurrentProject()
  const { isLoading } = useProjectQuery(projectId)

  if (isLoading) {
    return (
      <Stack gap="xl">
        {Array.from({ length: 3 }).map((_, i, arr) => (
          <Fragment key={i}>
            <ProfessionalItem />
            {i !== arr.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Stack>
    )
  }

  return (
    <Stack gap="lg">
      {professionals?.map((professional, i) => (
        <Fragment key={professional.dniCuit}>
          <ProfessionalItem {...professional} />
          {i !== professionals.length - 1 && <Divider />}
        </Fragment>
      ))}
    </Stack>
  )
}

type ProfessionalItemProps = Partial<ProjectProfessional>

export function ProfessionalItem({
  dniCuit,
  fullName,
  address,
  cityRegistration,
  provinceRegistration,
}: ProfessionalItemProps) {
  return (
    <Stack gap="xs">
      <Group>
        <Box flex={1}>
          <InfoItem label="Nombre" data={fullName} />
        </Box>
        <Box w="15ch">
          <InfoItem
            label={isDni(dniCuit ?? '') ? 'DNI' : 'CUIT'}
            data={dniCuit}
          />
        </Box>
      </Group>
      <InfoItem label="Dirección" data={address} />
      <Group>
        {provinceRegistration != null && (
          <Box flex={1}>
            <InfoItem
              label="Matrícula provincial"
              data={provinceRegistration}
            />
          </Box>
        )}
        {cityRegistration != null && (
          <Box flex={1}>
            <InfoItem label="Matrícula municipal" data={cityRegistration} />
          </Box>
        )}
      </Group>
    </Stack>
  )
}
