function getBase64(file: File | undefined) {
  if (!file) return ''

  return new Promise<string | null | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default getBase64
