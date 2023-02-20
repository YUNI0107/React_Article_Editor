import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react'
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
  icon,
  type,
}: {
  value: string | number
  setValue: (value: string) => void
  disabled?: boolean
  isFocused?: boolean
  setIsFocused?: (isFocus: boolean) => void
  customInfo?: string
  customDivClassNames?: string
  customInputClassNames?: string
  icon?: ReactNode
  type?: string
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [infoShow, setInfoShow] = useState(false)

  // operation
  const handleInputUnFocus = () => {
    if (isFocused && setIsFocused) setIsFocused(false)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)

    if (!infoShow) setInfoShow(true)
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
      <div className="w-full relative">
        <input
          type={type || 'text'}
          className={classNames(
            'w-full outline-none border-[1px] border-main-gray-400 bg-main-gray-100 rounded-2xl px-2 py-1 text-[10px]',
            { 'pl-7': icon },
            customInputClassNames
          )}
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
        />
        {icon && <div className="absolute left-2 top-1/2 -translate-y-1/2">{icon}</div>}
      </div>

      {infoShow && customInfo && <p className="text-[10px] mt-1 text-main-red">{customInfo}</p>}
    </div>
  )
}

export default BasicInput
