import { ChangeEvent, useContext } from 'react'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'

// validator
import imageTypeValidate from '../../../validator/imageTypeValidate'

function ImgPathControl({
  uuid,
  childUuid,
  onImgPathChange,
}: {
  uuid?: string
  childUuid?: string
  onImgPathChange?: (image: string) => void
}) {
  const { controlHandler } = useContext(SchemaContext)

  const changeInputValue = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0] || !imageTypeValidate(event.target.files?.[0])) {
      console.log('Not Correct Type')
      return
    }

    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image)
    const fileName = `${Date.now()}_${image.name}`
    const queryParams = new URLSearchParams({ key: fileName }).toString()

    fetch(`${process.env.REACT_APP_SERVER_URL}/image/upload/?${queryParams}`, {
      body: formData,
      method: 'POST',
    })
      .then((response) => response.json())
      .then((result) => {
        if (controlHandler && uuid) {
          controlHandler.changeValue('imgPath', result.url, uuid, childUuid)
        }

        if (onImgPathChange) onImgPathChange(result.url)
      })
  }

  return (
    <input
      className="w-full h-full opacity-0 cursor-pointer"
      type="file"
      onChange={changeInputValue}
      accept="image/png, image/jpeg, image/jpg, image/gif, image/svg "
    />
  )
}

export default ImgPathControl
