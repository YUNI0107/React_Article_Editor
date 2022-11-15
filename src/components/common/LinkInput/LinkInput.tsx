// components
import BasicInput from '../BasicInput'

// validate
import { urlValidate } from '../../../validator/commonValidate'

function LinkImage({ isLinked }: { isLinked?: boolean }) {
  if (isLinked) {
    return <i className="ri-link text-main-blue"></i>
  } else {
    return <i className="ri-link-unlink text-main-gray-400"></i>
  }
}

function LinkInput({
  link,
  changeLinkValue,
  inputFocused,
  setInputFocused,
  customDivClassNames,
  customInputClassNames,
}: {
  link: string
  changeLinkValue: (value: string) => void
  inputFocused?: boolean
  setInputFocused?: (isFocus: boolean) => void
  customDivClassNames?: string
  customInputClassNames?: string
}) {
  // operation
  const checkLinkValid = () => {
    if (link === '') {
      return '連結不可為空'
    }
    if (!urlValidate(link)) {
      return '連結格式錯誤'
    }
  }

  return (
    <BasicInput
      value={link}
      setValue={changeLinkValue}
      isFocused={inputFocused}
      setIsFocused={setInputFocused}
      customDivClassNames={customDivClassNames}
      customInputClassNames={customInputClassNames}
      customInfo={checkLinkValid()}
      icon={<LinkImage isLinked={urlValidate(link)} />}
    />
  )
}

export default LinkInput
