import { useEffect, useState } from 'react'

// components
import ControllerTitle from '../components/ControllerTitle'
import RadioButton from '../../common/RadioButton'
import LinkInput from '../../common/LinkInput'

// types
import { ChangeValueFuncType, ClickEventType, GetValueFuncType } from '../../../types/control'

// validate
import { urlValidate } from '../../../validator/commonValidate'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ClickEventControl({
  uuid,
  childUuid,
  getValue,
  changeValue,
}: {
  uuid: string
  childUuid?: string
  getValue: GetValueFuncType
  changeValue: ChangeValueFuncType
}) {
  const link = (getValue('linkUrl', uuid, childUuid) as string) || ''
  const eventKey = (getValue('clickEvent', uuid, childUuid) as ClickEventType) || 'image-popup'
  const [inputFocused, setInputFocused] = useState(false)

  const changeLinkValue = (value: string) => {
    changeValue('linkUrl', value, uuid, childUuid)
  }

  const changeClickEventValue = (clickEvent: ClickEventType) => {
    changeValue('clickEvent', clickEvent, uuid, childUuid)
  }

  // effects
  useEffect(() => {
    // If change to image options but the link is invalid, clean it!
    if (!urlValidate(link) && eventKey === 'image-popup') {
      changeValue('linkUrl', '', uuid, childUuid)
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
        changeValue('clickEvent', 'image-popup', uuid, childUuid)
      }
    }
  }, [])

  return (
    <>
      <ControllerTitle title="點擊事件" />

      <div>
        <div className="flex items-start mb-2">
          <RadioButton
            value="image-popup"
            name="click-event"
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
            name="click-event"
            id="link"
            onValueChange={changeClickEventValue}
            checked={eventKey === 'link'}
          />
          <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="link">
            超連結
          </label>
        </div>
        {eventKey === 'link' && (
          <LinkInput
            link={link}
            changeLinkValue={changeLinkValue}
            inputFocused={inputFocused}
            setInputFocused={setInputFocused}
            customDivClassNames="mt-2"
          />
        )}
      </div>
    </>
  )
}

export default ClickEventControl
