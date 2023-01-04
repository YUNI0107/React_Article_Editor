import { useContext } from 'react'

// contexts
import { TextPopupContext } from '../../../../contexts/TextPopupContextSection/TextPopupContextSection'

// components
import RadioButton from '../../../common/RadioButton'
import Slider from '../../../common/Slider'
import ControllerTitle from '../../components/ControllerTitle'

function LineHeightControl() {
  const { lineHeight, setNeedUpdate, lineHeightType } = useContext(TextPopupContext)

  const handleLineHeightToAuto = () => {
    setNeedUpdate({ lineHeight: null })
  }

  const handleLineHeightToCustom = () => {
    setNeedUpdate({ lineHeight })
  }

  const updateValueFromSlider = (value: number) => {
    setNeedUpdate({ lineHeight: value })
  }

  return (
    <div className="py-2">
      <ControllerTitle title="行高" />
      <div className="flex">
        <div className="flex items-start mr-2">
          <RadioButton
            value="auto"
            name="line-height"
            id="auto-height"
            onValueChange={handleLineHeightToAuto}
            checked={lineHeightType === 'auto'}
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
            onValueChange={handleLineHeightToCustom}
            checked={lineHeightType === 'custom'}
          />
          <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="custom-height">
            自訂行高
          </label>
        </div>
      </div>

      {lineHeightType === 'custom' && lineHeight && (
        <div className="mt-2">
          <Slider
            unit="px"
            defaultValue={lineHeight}
            min={8}
            max={36}
            updateValueFromSlider={updateValueFromSlider}
            watchChangedValue={lineHeight}
          />
        </div>
      )}
    </div>
  )
}

export default LineHeightControl
