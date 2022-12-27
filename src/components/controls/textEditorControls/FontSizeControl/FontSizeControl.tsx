import { useContext, useState } from 'react'

// constant
import { fontSizeList } from '../../../../constants/controller'

// components
import ControllerTitle from '../../components/ControllerTitle'
import DropDown from '../../../common/DropDown'
import Slider from '../../../common/Slider'

// contexts
import { TextPopupContext } from '../../../../contexts/TextPopupContextSection/TextPopupContextSection'

const FontSizeMap: { [key: number]: number } = {
  24: 1,
  16: 2,
  12: 3,
  10: 4,
}

function FontSizeControl() {
  const { fontSize, setNeedUpdate } = useContext(TextPopupContext)
  const [isOpen, setIsOpen] = useState(false)
  const fontSizeThemeValue = FontSizeMap[fontSize] || 0

  const setThemeCurrentValue = (sizeKey: number) => {
    const size = Object.entries(FontSizeMap).find(([, key]) => +key === sizeKey)?.[0]
    setNeedUpdate({ fontSize: size ? parseInt(size) : 0 })
  }

  const setCurrentValue = (size: number) => {
    setNeedUpdate({ fontSize: size })
  }

  return (
    <>
      <div className="py-2">
        <ControllerTitle title="主題字級" />
        <DropDown
          list={fontSizeList}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentValue={fontSizeThemeValue}
          setCurrentValue={(value) => setThemeCurrentValue(value as number)}
          unSelectedText="自定義字級大小"
        />
      </div>
      <div className="py-2">
        <ControllerTitle title="字級大小" />
        <Slider
          unit="px"
          defaultValue={fontSize}
          min={1}
          max={24}
          updateValueFromSlider={setCurrentValue}
          watchChangedValue={fontSize}
        />
      </div>
    </>
  )
}

export default FontSizeControl
