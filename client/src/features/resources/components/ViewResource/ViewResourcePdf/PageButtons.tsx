import { useCallback, useRef, useState } from 'react'

import { Box, Button, NumberInput } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

import { usePdfViewer } from '@Resources/context/PdfViewer'

export function PageButtons() {
  const { currentPage, totalPages, prevPage, nextPage } = usePdfViewer()
  const [isEditing, setIsEditing] = useState(false)

  if (totalPages <= 1) return null

  const PageSection = isEditing ? PageInput : PageCounter

  return (
    <Box
      pos="absolute"
      bottom={20}
      right="50%"
      style={{ transform: 'translateX(50%)' }}
    >
      <Button.Group miw={160}>
        <Button
          variant="default"
          size="xs"
          onClick={() => void prevPage()}
          disabled={!currentPage || currentPage.number === 1}
        >
          <IconChevronLeft height={16} width={16} stroke={2} />
        </Button>

        <Button.GroupSection size="xs" variant="default" flex={1}>
          <PageSection setIsEditing={setIsEditing} />
        </Button.GroupSection>

        <Button
          variant="default"
          size="xs"
          onClick={() => void nextPage()}
          disabled={!currentPage || currentPage.number === totalPages}
        >
          <IconChevronRight height={16} width={16} stroke={2} />
        </Button>
      </Button.Group>
    </Box>
  )
}

type PageSectionProps = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

function PageCounter({ setIsEditing }: PageSectionProps) {
  const { currentPage, totalPages } = usePdfViewer()
  return (
    <span onClick={() => setIsEditing(true)}>
      {currentPage?.number ?? 0} de {totalPages}
    </span>
  )
}

function PageInput({ setIsEditing }: PageSectionProps) {
  const { currentPage, totalPages, changeToPage } = usePdfViewer()
  const [value, setValue] = useState<number | string>(currentPage?.number ?? '')
  const inputRef = useRef<HTMLInputElement>(null)

  const isValidPage = useCallback(() => {
    const n = +value
    return n > 0 && n <= totalPages
  }, [totalPages, value])

  const setPage = useCallback(() => {
    if (!isValidPage()) return
    setIsEditing(false)
    void changeToPage(+value)
  }, [changeToPage, isValidPage, setIsEditing, value])

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setPage()
    },
    [setPage],
  )

  return (
    <form onSubmit={handleSubmit}>
      <NumberInput
        value={value}
        onChange={(newValue) => setValue(newValue)}
        ref={inputRef}
        // Validations:
        min={0}
        max={totalPages}
        clampBehavior="strict"
        allowDecimal={false}
        allowNegative={false}
        allowLeadingZeros={false}
        // Styles:
        variant="unstyled"
        error={!isValidPage()}
        hideControls
        w="5ch"
        styles={{ input: { border: 'none', textAlign: 'center' } }}
      />
    </form>
  )
}
