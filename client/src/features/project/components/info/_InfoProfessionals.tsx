import { Fragment } from 'react'

import { Box, Divider, Group, Stack } from '@mantine/core'

import type { ProjectProfessional } from '@Common/api/generated'

import { useCurrentProject } from '../../context/CurrentProject'
import { useProjectQuery } from '../../hooks/useProjectQuery'
import { InfoItem } from './_InfoItem'

type InfoProfessionalsProps = {
  professionals?: ProjectProfessional[]
}

export function InfoProfessionals({ professionals }: InfoProfessionalsProps) {
  const { organizationId, projectId } = useCurrentProject()
  const { isLoading } = useProjectQuery(organizationId, projectId)

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
  const isDni = /^\d{8}$/.test(dniCuit ?? '')

  return (
    <Stack gap="xs">
      <Group>
        <Box flex={1}>
          <InfoItem label="Nombre" data={fullName} />
        </Box>
        <Box w="15ch">
          <InfoItem label={isDni ? 'DNI' : 'CUIT'} data={dniCuit} />
        </Box>
      </Group>
      <InfoItem label="Dirección" data={address} />
      <Group>
        {provinceRegistration && (
          <Box flex={1}>
            <InfoItem
              label="Matrícula provincial"
              data={provinceRegistration}
            />
          </Box>
        )}
        {cityRegistration && (
          <Box flex={1}>
            <InfoItem label="Matrícula municipal" data={cityRegistration} />
          </Box>
        )}
      </Group>
    </Stack>
  )
}
