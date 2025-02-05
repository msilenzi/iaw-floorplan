import type { CurrentPageType } from '@Resources/types/PdfViewerValues'

import { useCallback, useRef, useState } from 'react'

import { PdfToImageConverter } from '@Resources/utils/PdfToImageConverter'

import { PdfViewerContext } from './PdfViewerContext'

type PdfViewerProviderProps = {
  children: React.ReactNode
}

export function PdfViewerProvider({ children }: PdfViewerProviderProps) {
  const pdfConverterRef = useRef<PdfToImageConverter>()
  const [currentPage, setCurrentPage] = useState<CurrentPageType>()
  const [totalPages, setTotalPages] = useState(0)

  const initializePdfConverter = useCallback(async (pdfUrl: string) => {
    const newPdfConverter = await PdfToImageConverter.createPdfFromUrl(pdfUrl)
    pdfConverterRef.current = newPdfConverter
    setTotalPages(pdfConverterRef.current.getTotalPages())
  }, [])

  const clearPdfConverter = useCallback(async () => {
    if (!pdfConverterRef.current) return
    await pdfConverterRef.current.destroy()
    pdfConverterRef.current = undefined
  }, [])

  const changeToPage = useCallback(async (pageNumber: number) => {
    if (!pdfConverterRef.current) return
    const url = await pdfConverterRef.current.convertPageToPng(pageNumber)
    setCurrentPage({ url, number: pageNumber })
  }, [])

  const initialPage = useCallback(async () => {
    await changeToPage(1)
  }, [changeToPage])

  const nextPage = useCallback(async () => {
    if (!currentPage || currentPage.number === totalPages) return
    await changeToPage(currentPage.number + 1)
  }, [changeToPage, currentPage, totalPages])

  const prevPage = useCallback(async () => {
    if (!currentPage || currentPage.number === 1) return
    await changeToPage(currentPage.number - 1)
  }, [changeToPage, currentPage])

  return (
    <PdfViewerContext.Provider
      value={{
        currentPage,
        totalPages,
        initializePdfConverter,
        clearPdfConverter,
        changeToPage,
        initialPage,
        nextPage,
        prevPage,
      }}
    >
      {children}
    </PdfViewerContext.Provider>
  )
}
