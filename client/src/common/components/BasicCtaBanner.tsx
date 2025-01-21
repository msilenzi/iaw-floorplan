import { Box, Text, Title, rem } from '@mantine/core'

import type { TablerIcon } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'

type BasicCtaBannerProps = {
  title: string
  description: string
  buttonText?: string
  ButtonIcon?: TablerIcon
  onClick?: () => void
}

export function BasicCtaBanner({
  title,
  description,
  buttonText,
  ButtonIcon,
  onClick,
}: BasicCtaBannerProps) {
  return (
    <Box m="0 " style={{ maxWidth: rem(600) }}>
      <Title order={2} mb="md" style={{ textWrap: 'balance' }}>
        {title}
      </Title>

      <Text mb="xl" style={{ textWrap: 'balance' }}>
        {description}
      </Text>

      {buttonText != null && (
        <PrimaryButton
          onClick={onClick}
          rightSection={ButtonIcon && <ButtonIcon size={16} stroke={3} />}
        >
          {buttonText}
        </PrimaryButton>
      )}
    </Box>
  )
}
