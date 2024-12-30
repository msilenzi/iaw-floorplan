import { forwardRef } from 'react'

import { Button, ButtonProps, ElementProps } from '@mantine/core'

type PrimaryButtonProps = ButtonProps &
  ElementProps<'button', keyof ButtonProps>

// forwardRef es para prevenir algunos problemas con Mantine.Menu
export default forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  function PrimaryButton(props: PrimaryButtonProps, ref) {
    return (
      <Button
        {...props}
        ref={ref}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      />
    )
  },
)
