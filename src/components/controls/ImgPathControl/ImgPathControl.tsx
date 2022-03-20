import { ChangeEvent, useContext } from 'react'

// utils
import { ControlHandler } from '../../../utils/controlHandler'

// types
import { IControlProps } from '../../../types/editor'

// contexts
import { SchemeContext } from '../../../contexts/SchemeContextSection'

function ImgPathControl({ order, uuid, ...props }: { order?: number; uuid?: string }) {
  const { schemes, handleScheme } = useContext(SchemeContext)
  const controlHandler = new ControlHandler('imgPath', schemes, handleScheme)
  const { imgPath } = props as IControlProps

  if (order === undefined || !uuid) return null

  const changeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    controlHandler.changeValue(event.target.value, uuid, order)
  }

  return (
    <div>
      <h1>Control</h1>
      <input type="text" value={imgPath} onChange={changeInputValue} />
    </div>
  )
}

export default ImgPathControl
