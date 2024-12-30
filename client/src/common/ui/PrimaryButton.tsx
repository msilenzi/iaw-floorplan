import { Button, ButtonProps, ElementProps } from '@mantine/core'

type PrimaryButtonProps = ButtonProps &
  ElementProps<'button', keyof ButtonProps>

export default function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <Button
      {...props}
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    />
  )
}
