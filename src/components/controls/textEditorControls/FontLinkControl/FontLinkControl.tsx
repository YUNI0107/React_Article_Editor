import { useContext, useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'

// contexts
import { TextPopupContext } from '../../../../contexts/TextPopupContextSection/TextPopupContextSection'

// components
import CheckBoxButton from '../../../common/CheckBoxButton'
import LinkInput from '../../../common/LinkInput'
import ControllerTitle from '../../components/ControllerTitle'

// utils
import { urlValidate } from '../../../../validator/commonValidate'

function FontLinkControl() {
  const { link: editorLink, setNeedUpdate } = useContext(TextPopupContext)
  const [checked, setChecked] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const [inputLink, setInputLink] = useState(editorLink)

  // operation
  const debouncedSearch = useRef(
    debounce((url) => {
      setNeedUpdate({ link: urlValidate(url) ? url : null })
    }, 300)
  )

  const changeLinkValue = (value: string) => {
    setInputLink(value)
    debouncedSearch.current(value)
  }

  const handleCheckbox = (value: boolean) => {
    setNeedUpdate({ link: null })
    setChecked(value)
  }

  // effects
  useEffect(() => {
    setChecked(editorLink !== null)
    setInputLink(editorLink)
  }, [editorLink])

  return (
    <div className="py-2">
      <ControllerTitle title="連結" />
      <div className="flex items-start">
        <CheckBoxButton
          value="title"
          name="text-show"
          id="text-title"
          onValueChange={handleCheckbox}
          checked={checked}
        />
        <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="text-title">
          新增連結
        </label>
      </div>
      {checked && (
        <LinkInput
          link={inputLink || ''}
          changeLinkValue={changeLinkValue}
          inputFocused={inputFocused}
          setInputFocused={setInputFocused}
          customDivClassNames="mt-2"
        />
      )}
    </div>
  )
}

export default FontLinkControl
