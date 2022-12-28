import { useState } from 'react'
import { ColorResult, ChromePicker } from 'react-color'

function FontColorControl() {
  const [background, setBackground] = useState('#fff')

  const handleChangeComplete = (color: ColorResult) => {
    setBackground(color.hex)
  }
  return <ChromePicker color={background} onChangeComplete={handleChangeComplete} />
}

export default FontColorControl
