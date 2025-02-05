export type CurrentPageType = {
  url: string
  number: number
}

export type PdfViewerState = {
  currentPage?: CurrentPageType
  totalPages: () => number
  initializePdfConverter: (pdfUrl: string) => Promise<void>
  clearPdfConverter: () => Promise<void>
  changeToPage: (pageNumber: number) => Promise<void>
  initialPage: () => Promise<void>
  nextPage: () => Promise<void>
  prevPage: () => Promise<void>
}
