import { useEffect, useState } from 'react'

// components
import ControllerTitle from '../components/ControllerTitle'
import RadioButton from '../../common/RadioButton'
import LinkInput from '../../common/LinkInput'

// types
import { ChangeValueFuncType, ClickEventType, GetValueFuncType } from '../../../types/control'

// validate
import { urlValidate } from '../../../validator/commonValidate'

function ClickEventControl({
  uuid,
  childUuid,
  getValue,
  changeValue,
}: {
  uuid: string
  childUuid?: string
  getValue?: GetValueFuncType
  changeValue?: ChangeValueFuncType
}) {
  if (!getValue || !changeValue) return null

  const defaultLink = (getValue('linkUrl', uuid, childUuid) as string) || ''
  const defaultEventKey =
    (getValue('clickEvent', uuid, childUuid) as ClickEventType) || 'image-popup'
  const [link, setLink] = useState(defaultLink)
  const [eventKey, setEventKey] = useState(defaultEventKey)
  const [inputFocused, setInputFocused] = useState(false)

  const changeLinkValue = (value: string) => {
    setLink(value)

    if (urlValidate(value)) {
      changeValue('clickEvent', 'link', uuid, childUuid)
      changeValue('linkUrl', value, uuid, childUuid)
    } else {
      changeValue('clickEvent', 'image-popup', uuid, childUuid)
    }
  }

  const changeClickEventValue = (clickEvent: ClickEventType) => {
    setEventKey(clickEvent)

    // Only image event can change directly
    if (clickEvent === 'image-popup') {
      changeValue('clickEvent', 'image-popup', uuid, childUuid)
      if (!urlValidate(link)) setLink('')
    } else if (clickEvent === 'link') {
      // If there are validate value in the input, you can set it directly.
      // If not, you must check it when you are setting input
      if (urlValidate(link)) {
        changeValue('clickEvent', 'link', uuid, childUuid)
        changeValue('linkUrl', link, uuid, childUuid)
      }

      setInputFocused(true)
    }
  }

  // effects
  useEffect(() => {
    setLink(defaultLink)
  }, [defaultLink, uuid, childUuid])

  useEffect(() => {
    setEventKey(defaultEventKey)
  }, [defaultEventKey, uuid, childUuid])

  return (
    <>
      <ControllerTitle title="點擊事件" />
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
    </>
  )
}

export default ClickEventControl
