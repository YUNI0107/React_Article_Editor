import { serverUrl, withServerFeature } from '../constants/env'
import getBase64 from './getBase64'

const getImagePathFromServer = (image: File) => {
  const formData = new FormData()
  formData.append('image', image)
  const fileName = `${Date.now()}_${image.name}`
  const queryParams = new URLSearchParams({ key: fileName }).toString()

  return new Promise<string>((resolve, reject) => {
    fetch(`${serverUrl}/image/upload/?${queryParams}`, {
      body: formData,
      method: 'POST',
    })
      .then((response) => response.json())
      .then((result) => {
        resolve(result.url)
      })
      .catch(() => {
        reject('getImagePathFromServer: Upload to server failed.')
      })
  })
}

const getImagePathFromBase24 = async (image: File) => {
  try {
    const imageBase64 = await getBase64(image)
    if (typeof imageBase64 === 'string') {
      return imageBase64
    }
  } catch {
    console.error('getImagePathFromBase24: Failed.')
  }
}

const uploadImage = (image: File) => {
  if (withServerFeature) {
    return getImagePathFromServer(image)
  } else {
    return getImagePathFromBase24(image)
  }
}

export default uploadImage
