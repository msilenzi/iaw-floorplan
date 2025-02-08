import { useEffect, useState } from 'react'

import {
  FileInput,
  Group,
  Image,
  Loader,
  Modal,
  Stack,
  TextInput,
} from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { useNotifications } from '@Common/hooks/useNotifications'
import { PrimaryButton } from '@Common/ui/PrimaryButton'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { useUploadResourceForm } from '@Resources/hooks/useUploadResourceForm'
import { PdfToImageConverter } from '@Resources/utils/PdfToImageConverter'

import { useResourceUploadMutation } from '../hooks/useResourceUploadMutation'

type UploadResourceModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function UploadResourceModal({
  isOpen,
  onClose,
}: UploadResourceModalProps) {
  const { isPending, mutateAsync } = useResourceUploadMutation()
  const { showErrorNotification, showSuccessNotification } = useNotifications()

  const form = useUploadResourceForm()

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await mutateAsync(values)
      form.reset()
      onClose()
      showSuccessNotification({
        title: 'Recurso subido con éxito',
        message: `El recurso ${values.name} fue subido correctamente`,
      })
    } catch (error) {
      const errorResponse = getErrorResponse(error, {
        title: 'No pudimos subir el recurso',
      })
      showErrorNotification(errorResponse)
    }
  })

  function handleClose() {
    if (!isPending) onClose()
  }

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title="Subir recurso"
      styles={{ title: { fontWeight: 700 } }}
      closeButtonProps={{ disabled: isPending }}
    >
      <form onSubmit={handleSubmit}>
        <fieldset
          style={{ margin: 0, padding: 0, border: 'none' }}
          disabled={isPending}
        >
          <Stack gap="md">
            <TextInput
              label="Nombre"
              placeholder="Nombre del recurso"
              withAsterisk
              key={form.key('name')}
              {...form.getInputProps('name')}
            />

            <FileInput
              label="Recurso"
              description="Subí una imagen o PDF de hasta 15 MiB"
              placeholder="Hace click acá para elegir un archivo"
              withAsterisk
              clearable
              accept="image/png,image/jpeg,application/pdf"
              key={form.key('file')}
              {...form.getInputProps('file')}
              styles={{
                input: {
                  width: '0',
                  minWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                },
              }}
            />

            <FilePreview file={form.getValues().file} />

            <Group justify="end" mt="xs">
              <PrimaryButton
                type="submit"
                rightSection={
                  isPending ? (
                    <Loader size="14" color="dark.2" />
                  ) : (
                    <IconPlus size={16} stroke={3} />
                  )
                }
                disabled={isPending}
              >
                {isPending ? 'Subiendo recurso' : 'Subir recurso'}
              </PrimaryButton>
            </Group>
          </Stack>
        </fieldset>
      </form>
    </Modal>
  )
}

type FilePreviewProps = {
  file: File | null
}

function FilePreview({ file }: FilePreviewProps) {
  const [objUrl, setObjUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setObjUrl(null)
      return
    }

    const newObjUrl = URL.createObjectURL(file)
    setObjUrl(newObjUrl)

    return () => URL.revokeObjectURL(newObjUrl)
  }, [file])

  if (file == null || objUrl === null) return null

  if (file.type === 'image/jpeg' || file.type === 'image/png') {
    return (
      <a target="_blank" rel="noreferrer" href={objUrl}>
        <Image radius="sm" mah="40dvh" src={objUrl} />
      </a>
    )
  }

  if (file.type === 'application/pdf') {
    return (
      <a
        target="_blank"
        rel="noreferrer"
        href={objUrl}
        style={{
          textAlign: 'center',
          color: 'var(--mantine-color-dimmed)',
          textDecoration: 'none',
        }}
      >
        <PdfPreview file={file} />
      </a>
    )
  }

  return 'Formato inválido'
}

function PdfPreview({ file }: { file: File }) {
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState('')

  useEffect(() => {
    let pdfConverter: PdfToImageConverter | null = null

    void (async () => {
      pdfConverter = await PdfToImageConverter.createPdfFromFile(file)
      const url = await pdfConverter.convertPageToPng(1)
      setPdfPreviewUrl(url)
    })()

    async function clearPdf() {
      if (!pdfConverter) return
      await pdfConverter.destroy()
    }

    return () => void clearPdf()
  }, [file])

  if (pdfPreviewUrl === '') {
    return 'Cargando...'
  }

  return (
    <Image
      radius="sm"
      mah="40dvh"
      w="100%"
      src={pdfPreviewUrl}
      style={{ objectPosition: 'center top' }}
    />
  )
}
