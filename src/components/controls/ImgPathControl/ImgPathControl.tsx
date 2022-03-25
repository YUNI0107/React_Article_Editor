import { ChangeEvent, useContext } from 'react'

// utils
import ControlHandler from '../../../utils/controlHandler'
import getBase64 from '../../../utils/getBase64'

// contexts
import { SchemeContext } from '../../../contexts/SchemeContextSection'

function ImgPathControl({ order, uuid }: { order?: number; uuid?: string }) {
  const { schemes, handleScheme } = useContext(SchemeContext)
  const controlHandler = new ControlHandler('imgPath', schemes, handleScheme)

  if (order === undefined || !uuid) return null

  const changeInputValue = async (event: ChangeEvent<HTMLInputElement>) => {
    const imageBase64 = await getBase64(event.target.files?.[0])

    if (typeof imageBase64 === 'string') {
      controlHandler.changeValue(imageBase64, uuid, order)
    }
  }

  return (
    <div>
      <h1>Control</h1>
      <input type="file" onChange={changeInputValue} />
    </div>
  )
}

export default ImgPathControl
