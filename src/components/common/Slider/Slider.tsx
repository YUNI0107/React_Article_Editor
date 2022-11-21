import { useState } from 'react'
import ReactSlider from 'react-slider'

function Slider({
  unit,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
}: {
  unit?: string
  defaultValue?: number
  min?: number
  max?: number
  step?: number
}) {
  const [value, setValue] = useState(defaultValue)

  return (
    <div className="flex items-center">
      <ReactSlider
        className="w-full h-2 flex-1"
        trackClassName="track"
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        renderThumb={(props) => (
          <div
            {...props}
            className="top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full flex justify-center items-center drop-shadow-lg cursor-pointer"
          >
            <div className="h-3 w-3 bg-secondary-blue-200 rounded-full "></div>
          </div>
        )}
        onChange={(value) => setValue(value)}
      />
      {unit && <p className="ml-2">{`${value} ${unit}`}</p>}
    </div>
  )
}

export default Slider
