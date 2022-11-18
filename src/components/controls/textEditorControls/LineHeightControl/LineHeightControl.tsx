// components
import RadioButton from '../../../common/RadioButton'
import Slider from '../../../common/Slider'
import ControllerTitle from '../../components/ControllerTitle'

function LineHeightControl() {
  return (
    <div className="py-2">
      <ControllerTitle title="行高" />
      <div className="flex mb-2">
        <div className="flex items-start mr-2">
          <RadioButton
            value="image-popup"
            name="click-event"
            id="image-popup"
            onValueChange={() => console.log()}
            checked={false}
          />
          <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="image-popup">
            自動
          </label>
        </div>

        <div className="flex items-start">
          <RadioButton
            value="link"
            name="click-event"
            id="link"
            onValueChange={() => console.log()}
            checked={false}
          />
          <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="link">
            自訂行高
          </label>
        </div>
      </div>
      <Slider unit="rem" defaultValue={1} min={1} max={30} />
    </div>
  )
}

export default LineHeightControl
