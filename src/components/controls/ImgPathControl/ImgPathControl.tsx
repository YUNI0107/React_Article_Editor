import { ChangeEvent, useContext } from 'react'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'

// utils
import getBase64 from '../../../utils/getBase64'

// validator
import imageTypeValidate from '../../../validator/imageTypeValidate'

function ImgPathControl({
  uuid,
  childUuid,
  onImgPathChange,
}: {
  uuid: string
  childUuid?: string
  onImgPathChange?: () => void
}) {
  const { controlHandler } = useContext(SchemaContext)

  const changeInputValue = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0] || !imageTypeValidate(event.target.files?.[0])) {
      console.log('Not Correct Type')
      return
    }

    const imageBase64 = await getBase64(event.target.files[0])
    if (typeof imageBase64 === 'string') {
      controlHandler?.changeValue('imgPath', imageBase64, uuid, childUuid)

      if (onImgPathChange) onImgPathChange()
    }
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
