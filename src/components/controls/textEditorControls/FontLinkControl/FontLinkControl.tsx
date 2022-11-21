import { useState } from 'react'

// components
import CheckBoxButton from '../../../common/CheckBoxButton'
import LinkInput from '../../../common/LinkInput'
import ControllerTitle from '../../components/ControllerTitle'

function FontLinkControl() {
  const [inputFocused, setInputFocused] = useState(false)
  const isFontLinked = true

  return (
    <div className="py-2">
      <ControllerTitle title="連結" />
      <div className="flex items-start">
        <CheckBoxButton
          value="title"
          name="text-show"
          id="text-title"
          onValueChange={(value: boolean) => console.log(value)}
          checked={isFontLinked}
        />
        <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="text-title">
          新增連結
        </label>
      </div>
      {isFontLinked && (
        <LinkInput
          link={''}
          changeLinkValue={() => console.log('')}
          inputFocused={inputFocused}
          setInputFocused={setInputFocused}
          customDivClassNames="mt-2"
        />
      )}
    </div>
  )
}

export default FontLinkControl
