import { useEffect, useState } from 'react'

// components
import ControllerTitle from '../components/ControllerTitle'
import RadioButton from '../../common/RadioButton'
import BasicInput from '../../common/BasicInput'

// types
import { ClickEventType } from '../../../types/control'

// validate
import { urlValidate } from '../../../validator/commonValidate'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ClickEventControl({ uuid, childUuid }: { uuid: string; childUuid?: string }) {
  // console.log(uuid, childUuid)
  const [eventKey, setEventKey] = useState<ClickEventType>('image-popup')
  const [link, setLink] = useState('')
  const [inputFocused, setInputFocused] = useState(false)

  // operation
  const checkLinkValid = () => {
    if (link === '') {
      return '連結不可為空'
    }
    if (!urlValidate(link)) {
      return '連結格式錯誤'
    }
  }

  // effects
  useEffect(() => {
    // If change to image options but the link is invalid, clean it!
    if (!urlValidate(link) && eventKey === 'image-popup') {
      setLink('')
    }
  }, [link, eventKey])

  useEffect(() => {
    if (eventKey === 'link') {
      setInputFocused(true)
    }
  }, [eventKey])

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
        {eventKey === 'link' && (
          <BasicInput
            value={link}
            setValue={setLink}
            isFocused={inputFocused}
            setIsFocused={setInputFocused}
            customDivClassNames="mt-2"
            customInfo={checkLinkValid()}
          />
        )}
      </div>
    </div>
  )
}

export default ClickEventControl
