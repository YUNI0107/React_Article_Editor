import { useState } from 'react'

// components
import ControllerTitle from '../components/ControllerTitle'
import RadioButton from '../../common/RadioButton'

// types
import { ClickEventType } from '../../../types/control'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ClickEventControl({ uuid, childUuid }: { uuid: string; childUuid?: string }) {
  // console.log(uuid, childUuid)
  const [eventKey, setEventKey] = useState<ClickEventType>('image-popup')

  return (
    <div>
      <ControllerTitle title="點擊事件" />

      <div>
        <div className="flex items-start mb-2">
          <RadioButton
            value="image-popup"
            name="radio"
            id="image-popup"
            onValueChange={setEventKey}
            checked={eventKey === 'image-popup'}
          />
          <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="image-popup">
            圖片彈窗
          </label>
        </div>

        <div className="flex items-start">
          <RadioButton
            value="link"
            name="radio"
            id="link"
            onValueChange={setEventKey}
            checked={eventKey === 'link'}
          />
          <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="link">
            超連結
          </label>
        </div>
      </div>
    </div>
  )
}

export default ClickEventControl
