import { ChangeEvent, useContext } from 'react'

// utils
import ControlHandler from '../../../utils/controlHandler'
import getBase64 from '../../../utils/getBase64'

// validator
import imageTypeValidate from '../../../validator/imageTypeValidate'

// contexts
import { SchemeContext } from '../../../contexts/SchemeContextSection'

function ImgPathControl({ order, uuid }: { order?: number; uuid?: string }) {
  const { schemes, handleScheme } = useContext(SchemeContext)
  const controlHandler = new ControlHandler('imgPath', schemes, handleScheme)

  if (order === undefined || !uuid) return null

  const changeInputValue = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0] || !imageTypeValidate(event.target.files?.[0])) {
      console.log('NOT Correct Type')
      return
    }

    const imageBase64 = await getBase64(event.target.files[0])
    if (typeof imageBase64 === 'string') {
      controlHandler.changeValue(imageBase64, uuid, order)
    }
  }

  return (
    <div>
      <h1>Control</h1>
      <input
        type="file"
        onChange={changeInputValue}
        accept="image/png, image/jpeg, image/jpg, image/gif, image/svg "
      />
    </div>
  )
}

export default ImgPathControl
