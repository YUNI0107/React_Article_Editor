import { ChangeEvent, useContext } from 'react'

// utils
import ControlHandler from '../../../utils/controlHandler'
import getBase64 from '../../../utils/getBase64'

// validator
import imageTypeValidate from '../../../validator/imageTypeValidate'

// contexts
import { SchemeContext } from '../../../contexts/SchemeContextSection'

function ImgPathControl({ uuid, order }: { uuid: string; order?: number }) {
  const { schemes, handleScheme } = useContext(SchemeContext)
  const controlHandler = new ControlHandler('imgPath', schemes, handleScheme)

  const changeInputValue = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(order, uuid)

    if (!event.target.files?.[0] || !imageTypeValidate(event.target.files?.[0])) {
      console.log('Not Correct Type')
      return
    }

    const imageBase64 = await getBase64(event.target.files[0])
    if (typeof imageBase64 === 'string') {
      controlHandler.changeValue(imageBase64, uuid, order)
    }
  }

  return (
    <div className="p-10">
      <h1>ControlControlControlControlControlControlControlControl</h1>
      <input
        type="file"
        onChange={changeInputValue}
        accept="image/png, image/jpeg, image/jpg, image/gif, image/svg "
      />
    </div>
  )
}

export default ImgPathControl
