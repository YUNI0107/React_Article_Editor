const dataURLToBlob = (dataURL: string) => {
  const parts = dataURL.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const byteCharacters = atob(parts[1])
  const byteArrays = new Uint8Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i)
  }

  return new Blob([byteArrays], { type: contentType })
}

const createFileFromCanvas = (canvas: HTMLCanvasElement) => {
  const dataURL = canvas.toDataURL()
  const blob = dataURLToBlob(dataURL)
  const file = new File([blob], 'canvas_image.png', { type: 'image/png' })

  return file
}

export default createFileFromCanvas
