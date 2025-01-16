import { Button } from '@mantine/core'

type AddFieldButtonProps = {
  onClick: () => void
  children: React.ReactNode
}

export function AddFieldButton({ onClick, children }: AddFieldButtonProps) {
  return (
    <Button
      w="100%"
      variant="subtle"
      color="dark.2"
      bd="1px dashed var(--mantine-color-dark-4)"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
