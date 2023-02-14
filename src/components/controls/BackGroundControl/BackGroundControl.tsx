import { useState, useEffect } from 'react'
import { ColorResult } from 'react-color'

// types
import { ChangeValueFuncType, GetValueFuncType } from '../../../types/control'

// components
import ControllerTitle from '../components/ControllerTitle'
import ColorPicker from '../components/ColorPicker'

function BackGroundControl({
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

  const backgroundColor = getValue('backgroundColor', uuid, childUuid) || ''
  const [pickerBackground, setPickerBackground] = useState(backgroundColor)

  // operation
  const handleChangeComplete = (color: ColorResult) => {
    changeValue('backgroundColor', color.hex, uuid, childUuid)
    setPickerBackground(color.hex)
    console.log('color', color)
  }

  useEffect(() => {
    if (backgroundColor && backgroundColor !== pickerBackground)
      setPickerBackground(backgroundColor)
  }, [backgroundColor])

  return (
    <>
      <ControllerTitle title="背景顏色" />

      <ColorPicker
        pickerBackground={pickerBackground}
        handleChangeComplete={handleChangeComplete}
      />
    </>
  )
}

export default BackGroundControl
