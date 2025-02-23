import { ChangeEvent, useContext } from 'react'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'

// validator
import imageTypeValidate from '../../../validator/imageTypeValidate'
import uploadImage from '../../../utils/uploadImage'

function ImgPathControl({
  uuid,
  childUuid,
  onImgPathChange,
  setIsLoading,
}: {
  uuid?: string
  childUuid?: string
  onImgPathChange?: (image: string) => void
  setIsLoading?: (isLoading: boolean) => void
}) {
  const { controlHandler } = useContext(SchemaContext)

  const changeInputValue = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0] || !imageTypeValidate(event.target.files?.[0])) {
      console.log('Not Correct Type')
      return
    }

    if (setIsLoading) setIsLoading(true)
    const image = event.target.files[0]

    uploadImage(image).then((url) => {
      if (!url) return

      if (controlHandler && uuid) {
        controlHandler.changeValue('imgPath', url, uuid, childUuid)
      }

      if (onImgPathChange) onImgPathChange(url)
      if (setIsLoading) setIsLoading(false)
    })
  }

  return (
    <>
      <input
        className="w-full h-full opacity-0 cursor-pointer"
        type="file"
        onChange={changeInputValue}
        accept="image/png, image/jpeg, image/jpg, image/gif, image/svg "
      />
    </>
  )
}

export default ImgPathControl
