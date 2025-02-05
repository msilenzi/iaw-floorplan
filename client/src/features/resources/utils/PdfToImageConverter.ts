import type { PDFDocumentProxy } from 'pdfjs-dist'

import * as pdfjs from 'pdfjs-dist'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export class PdfToImageConverter {
  private readonly cache = new Map<string, string>()
  private isDestroyed = false

  private constructor(private readonly pdfDocument: PDFDocumentProxy) {}

  public static async createPdfFromUrl(
    url: string,
  ): Promise<PdfToImageConverter> {
    const pdfDocument = await pdfjs.getDocument(url).promise
    return new PdfToImageConverter(pdfDocument)
  }

  public getTotalPages(): number {
    this.checkDestroyed()
    return this.pdfDocument.numPages
  }

  public async convertPageToPng(
    pageNumber: number,
    scale = 2,
  ): Promise<string> {
    this.checkDestroyed()

    const cacheKey = `${pageNumber}-${scale}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    const page = await this.pdfDocument.getPage(pageNumber)
    const viewport = page.getViewport({ scale })

    const canvas = document.createElement('canvas')
    const canvasContext = canvas.getContext('2d')

    if (!canvasContext) throw new Error('Could not get 2D context from canvas')

    canvas.width = viewport.width
    canvas.height = viewport.height

    await page.render({ canvasContext, viewport }).promise

    const url = await new Promise<string>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob))
        } else {
          reject(new Error('Failed to create PNG blob'))
        }
      }, 'image/png')
    })

    this.cache.set(cacheKey, url)
    return url
  }

  public async destroy() {
    this.checkDestroyed()
    this.cache.forEach((url) => URL.revokeObjectURL(url))
    this.cache.clear()
    await this.pdfDocument.destroy()
    this.isDestroyed = true
  }

  private checkDestroyed() {
    if (this.isDestroyed) {
      throw new Error('PdfToImageConverter has been destroyed')
    }
  }
}
