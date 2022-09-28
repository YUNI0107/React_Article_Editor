import { useState } from 'react'

// components
import ControllerTitle from '../components/ControllerTitle'
import RadioButton from '../../common/RadioButton'

// types
import { ClickEventType } from '../../../types/control'

function ClickEventControl({ uuid, childUuid }: { uuid: string; childUuid?: string }) {
  console.log(uuid, childUuid)
  const [eventKey, setEventKey] = useState<ClickEventType>('image-popup')

  return (
    <div>
      <ControllerTitle title="點擊事件" />

      <div>
        <div className="flex items-center mb-2">
          <RadioButton
            value="image-popup"
            name="clickEvent"
            onValueChange={setEventKey}
            checked={eventKey === 'image-popup'}
          />
          <label className="text-[10px] ml-2">圖片彈窗</label>
        </div>

        <div className="flex items-center">
          <RadioButton
            value="link"
            name="clickEvent"
            onValueChange={setEventKey}
            checked={eventKey === 'link'}
          />
          <label className="text-[10px] ml-2">超連結</label>
        </div>
      </div>
    </div>
  )
}

export default ClickEventControl
