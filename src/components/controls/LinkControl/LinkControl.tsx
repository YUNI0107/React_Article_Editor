import { useState } from 'react'

// components
import ControllerTitle from '../components/ControllerTitle'
import CheckBoxButton from '../../common/CheckBoxButton'
import LinkInput from '../../common/LinkInput'

// types
import { GetValueFuncType, ChangeValueFuncType } from '../../../types/control'

// validate
import { urlValidate } from '../../../validator/commonValidate'

function LinkControl({
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

  const link = getValue('linkUrl', uuid, childUuid)
  const isLinkBlank = getValue('isLinkBlank', uuid, childUuid)

  // states
  const [inputLink, setInputLink] = useState(link)

  // operations
  const handleCheckbox = (value: boolean) => {
    changeValue('isLinkBlank', value, uuid, childUuid)
  }

  const changeLinkValue = (value: string) => {
    setInputLink(value)

    if (urlValidate(value)) {
      changeValue('linkUrl', value, uuid, childUuid)
    } else {
      changeValue('linkUrl', '', uuid, childUuid)
    }
  }

  return (
    <>
      <ControllerTitle title="超連結" />

      <div className="flex items-start">
        <CheckBoxButton
          value="title"
          name="text-show"
          id="text-title"
          onValueChange={handleCheckbox}
          checked={isLinkBlank}
        />
        <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="text-title">
          另開視窗
        </label>
      </div>
      <LinkInput
        link={inputLink || ''}
        changeLinkValue={changeLinkValue}
        customDivClassNames="mt-2"
      />
    </>
  )
}

export default LinkControl
