const LEGAL_IMAGE_TYPE = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg']

function imageTypeValidate(file?: File): boolean {
  if (!file) return false

  return LEGAL_IMAGE_TYPE.includes(file.type) ? true : false
}

export default imageTypeValidate
