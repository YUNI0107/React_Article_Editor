import { useContext, useEffect, useState } from 'react'

// components
import ControllerTitle from '../components/ControllerTitle'
import RadioButton from '../../common/RadioButton'
import BasicInput from '../../common/BasicInput'

// types
import { ClickEventType } from '../../../types/control'

// validate
import { urlValidate } from '../../../validator/commonValidate'

// utils
import ControlHandler from '../../../utils/controlHandler'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ClickEventControl({ uuid, childUuid }: { uuid: string; childUuid?: string }) {
  const { schemas, handleSchema } = useContext(SchemaContext)
  const controlLinkHandler = new ControlHandler('linkUrl', schemas, handleSchema)
  const controlEventHandler = new ControlHandler('clickEvent', schemas, handleSchema)
  const link = (controlLinkHandler.getValue(uuid, childUuid) as string) || ''
  const eventKey =
    (controlEventHandler.getValue(uuid, childUuid) as ClickEventType) || 'image-popup'
  const [inputFocused, setInputFocused] = useState(false)

  console.log(controlLinkHandler.schemas, controlEventHandler.schemas)
  console.log(eventKey, link)

  // operation
  const checkLinkValid = () => {
    if (link === '') {
      return '連結不可為空'
    }
    if (!urlValidate(link)) {
      return '連結格式錯誤'
    }
  }

  const changeLinkValue = (value: string) => {
    controlLinkHandler.changeValue(value, uuid, childUuid)
  }

  const changeClickEventValue = (clickEvent: ClickEventType) => {
    controlEventHandler.changeValue(clickEvent, uuid, childUuid)
  }

  // effects
  useEffect(() => {
    // If change to image options but the link is invalid, clean it!
    if (!urlValidate(link) && eventKey === 'image-popup') {
      controlLinkHandler.changeValue('', uuid, childUuid)
    }
  }, [link, eventKey])

  useEffect(() => {
    if (eventKey === 'link') {
      setInputFocused(true)
    }
  }, [eventKey])

  useEffect(() => {
    return () => {
      if (!urlValidate(link)) {
        controlEventHandler.changeValue('image-popup', uuid, childUuid)
      }
    }
  }, [])

  return (
    <div>
      <ControllerTitle title="點擊事件" />

      <div>
        <div className="flex items-start mb-2">
          <RadioButton
            value="image-popup"
            name="radio"
            id="image-popup"
            onValueChange={changeClickEventValue}
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
            onValueChange={changeClickEventValue}
            checked={eventKey === 'link'}
          />
          <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="link">
            超連結
          </label>
        </div>
        {eventKey === 'link' && (
          <BasicInput
            value={link}
            setValue={changeLinkValue}
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
