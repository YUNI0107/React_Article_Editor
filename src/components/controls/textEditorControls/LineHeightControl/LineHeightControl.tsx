import { useState } from 'react'

// types
import { LineHeightType } from '../../../../types/control'

// components
import RadioButton from '../../../common/RadioButton'
import Slider from '../../../common/Slider'
import ControllerTitle from '../../components/ControllerTitle'

function LineHeightControl() {
  const [temp, setTemp] = useState<LineHeightType>('auto')

  return (
    <div className="py-2">
      <ControllerTitle title="行高" />
      <div className="flex">
        <div className="flex items-start mr-2">
          <RadioButton
            value="auto"
            name="line-height"
            id="auto-height"
            onValueChange={setTemp}
            checked={temp === 'auto'}
          />
          <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="auto-height">
            自動
          </label>
        </div>

        <div className="flex items-start">
          <RadioButton
            value="custom"
            name="line-height"
            id="custom-height"
            onValueChange={setTemp}
            checked={temp === 'custom'}
          />
          <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="custom-height">
            自訂行高
          </label>
        </div>
      </div>

      {temp === 'custom' && (
        <div className="mt-2">
          <Slider unit="rem" defaultValue={1} min={1} max={5} step={0.1} />
        </div>
      )}
    </div>
  )
}

export default LineHeightControl
