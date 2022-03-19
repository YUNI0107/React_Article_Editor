import { ControlHandler } from '../../../utils/controlHandler'

// types
import { IControlProps } from '../../../types/editor'
import { ChangeEvent } from 'react'

function ImgPathControl({ order, ...props }: { order?: number }) {
  const controlHandler = new ControlHandler()
  const { imgPaths } = props as IControlProps

  const changeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    controlHandler.changeValue(event.target.value)
  }

  if (order === undefined || !imgPaths) return null
  return (
    <div>
      <h1>Control</h1>
      <input type="text" value={imgPaths[order]} onChange={changeInputValue} />
    </div>
  )
}

export default ImgPathControl
