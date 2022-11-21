import { useState } from 'react'

// constant
import { fontSizeList } from '../../../../constants/controller'

// components
import ControllerTitle from '../../components/ControllerTitle'
import DropDown from '../../../common/DropDown'
import Slider from '../../../common/Slider'

function FontSizeControl() {
  const [fontSize, setFontSize] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="py-2">
        <ControllerTitle title="主題字級" />
        <DropDown
          list={fontSizeList}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentValue={fontSize}
          setCurrentValue={(value) => setFontSize(value as number)}
        />
      </div>
      <div className="py-2">
        <ControllerTitle title="字級大小" />
        <Slider unit="px" defaultValue={1} min={1} max={24} />
      </div>
    </>
  )
}

export default FontSizeControl
