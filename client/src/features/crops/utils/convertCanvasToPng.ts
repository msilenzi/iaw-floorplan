export async function convertCanvasToPng(
  canvas: HTMLCanvasElement,
  fileName: string,
): Promise<File | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(null)
        return
      }
      const file = new File([blob], fileName, {
        type: 'image/png',
        lastModified: Date.now(),
      })

      resolve(file)
    }, 'image/png')
  })
}
