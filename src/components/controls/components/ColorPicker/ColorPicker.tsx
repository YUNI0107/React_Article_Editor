import { useState } from 'react'
import { ChromePicker, ColorResult } from 'react-color'

function ColorPicker({
  pickerBackground,
  handleChangeComplete,
}: {
  pickerBackground: string
  handleChangeComplete: (color: ColorResult) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handlePickerOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative flex items-center">
      <button className="border p-1 w-full h-5 rounded-lg mr-2" onClick={handlePickerOpen}>
        <span
          className="block w-full h-full rounded-lg border border-slate-100"
          style={{ backgroundColor: pickerBackground }}
        ></span>
      </button>

      <span className="text-xs text-main-gray-500">{pickerBackground}</span>

      {isOpen && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <ChromePicker
            color={pickerBackground}
            onChangeComplete={handleChangeComplete}
            disableAlpha={true}
          />
        </div>
      )}
    </div>
  )
}

export default ColorPicker
