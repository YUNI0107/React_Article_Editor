import { useState, useContext, useEffect } from 'react'
import { ColorResult } from 'react-color'

// components
import ControllerTitle from '../../components/ControllerTitle'
import ColorPicker from '../../components/ColorPicker'

// contexts
import { TextPopupContext } from '../../../../contexts/TextPopupContextSection/TextPopupContextSection'

function FontColorControl() {
  const { color, setNeedUpdate } = useContext(TextPopupContext)
  const [pickerBackground, setPickerBackground] = useState('#000000')

  // operation
  const handleChangeComplete = (color: ColorResult) => {
    setNeedUpdate({ fontColor: color.hex })
    setPickerBackground(color.hex)
  }

  // effects
  useEffect(() => {
    if (color && color !== pickerBackground) setPickerBackground(color)
  }, [color])

  return (
    <>
      <ControllerTitle />
      <ColorPicker
        pickerBackground={pickerBackground}
        handleChangeComplete={handleChangeComplete}
      />
    </>
  )
}

export default FontColorControl
