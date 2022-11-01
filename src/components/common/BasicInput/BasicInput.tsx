import { ChangeEvent, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

function BasicInput({
  value,
  setValue,
  disabled,
  isFocused,
  setIsFocused,
  customInfo,
  customDivClassNames,
  customInputClassNames,
}: {
  value: string
  setValue: (value: string) => void
  disabled?: boolean
  isFocused?: boolean
  setIsFocused?: (isFocus: boolean) => void
  customInfo?: string
  customDivClassNames?: string
  customInputClassNames?: string
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [infoShow, setInfoShow] = useState(false)

  // operation
  const handleInputUnFocus = () => {
    setInfoShow(true)
    if (isFocused && setIsFocused) setIsFocused(false)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  // effects
  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus()
    }

    inputRef.current?.addEventListener('blur', handleInputUnFocus)
    return () => inputRef.current?.removeEventListener('blur', handleInputUnFocus)
  }, [isFocused])

  return (
    <div className={classNames('w-full flex flex-col', customDivClassNames)}>
      <input
        type="text"
        className={classNames(
          'w-full outline-none border-[1px] border-main-gray-400 bg-main-gray-100 rounded-2xl px-2 py-1 text-[10px]',
          customInputClassNames
        )}
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
      />
      {infoShow && customInfo && <p className="text-[10px] mt-1 text-main-red">{customInfo}</p>}
    </div>
  )
}

export default BasicInput
