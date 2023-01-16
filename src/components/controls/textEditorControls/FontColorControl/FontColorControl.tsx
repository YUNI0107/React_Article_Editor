import { useState, useContext, useEffect } from 'react'
import { ColorResult, ChromePicker } from 'react-color'

// components
import ControllerTitle from '../../components/ControllerTitle'

// contexts
import { TextPopupContext } from '../../../../contexts/TextPopupContextSection/TextPopupContextSection'

function FontColorControl() {
  const { color, setNeedUpdate } = useContext(TextPopupContext)
  const [pickerBackground, setPickerBackground] = useState('#000000')
  const [isOpen, setIsOpen] = useState(false)

  // operation
  const handleChangeComplete = (color: ColorResult) => {
    setNeedUpdate({ fontColor: color.hex })
    setPickerBackground(color.hex)
  }

  const handlePickerOpen = () => {
    setIsOpen(!isOpen)
  }

  // effects
  useEffect(() => {
    if (color && color !== pickerBackground) setPickerBackground(color)
  }, [color])

  return (
    <>
      <ControllerTitle />

      <div className="relative">
        <button className="border p-1 w-full h-5 rounded-lg" onClick={handlePickerOpen}>
          <span
            className="block w-full h-full rounded-lg border border-slate-100"
            style={{ backgroundColor: pickerBackground }}
          ></span>
        </button>

        {isOpen && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
            <ChromePicker color={pickerBackground} onChangeComplete={handleChangeComplete} />
          </div>
        )}
      </div>
    </>
  )
}

export default FontColorControl
