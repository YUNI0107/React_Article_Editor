import { useEffect, useState } from 'react'
import { ColorResult } from 'react-color'

// components
import Slider from '../../common/Slider'
import ControllerTitle from '../components/ControllerTitle'
import ColorPicker from '../components/ColorPicker'

// types
import { ChangeValueFuncType, GetValueFuncType } from '../../../types/control'

function BorderControl({
  uuid,
  childUuid,
  getValue,
  changeValue,
}: {
  uuid: string
  childUuid?: string
  getValue?: GetValueFuncType
  changeValue?: ChangeValueFuncType
}) {
  if (!getValue || !changeValue) return null

  const borderWidth = getValue('borderWidth', uuid, childUuid) || 0
  const borderColor = getValue('borderColor', uuid, childUuid) || ''
  const [pickerBackground, setPickerBackground] = useState(borderColor)

  // operation
  const setBorderValue = (value: number) => {
    changeValue('borderWidth', value, uuid, childUuid)
  }

  // operation
  const handleColorChangeComplete = (color: ColorResult) => {
    changeValue('borderColor', color.hex, uuid, childUuid)
    setPickerBackground(color.hex)
  }

  useEffect(() => {
    if (borderColor && borderColor !== pickerBackground) setPickerBackground(borderColor)
  }, [borderColor])

  return (
    <>
      <ControllerTitle title="邊框" />

      <div className="mb-2">
        <Slider
          unit="px"
          defaultValue={borderWidth}
          min={0}
          max={20}
          updateValueFromSlider={setBorderValue}
          watchChangedValue={borderWidth}
        />
      </div>

      <ColorPicker
        pickerBackground={pickerBackground}
        handleChangeComplete={handleColorChangeComplete}
      />
    </>
  )
}

export default BorderControl
