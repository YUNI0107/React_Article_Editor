// types
import classNames from 'classnames'
import { IDropDownListItem } from '../../../types/layout'

function DropDown({
  list,
  isOpen,
  setIsOpen,
  currentValue,
  setCurrentValue,
  unSelectedText,
}: {
  list: Array<IDropDownListItem>
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  currentValue: string | number
  setCurrentValue: (value: string | number) => void
  unSelectedText?: string
}) {
  const displayText = list.find((item) => item.value === currentValue)?.text

  // operation
  const setNewValue = (value: string | number) => {
    if (currentValue === value) return
    setCurrentValue(value)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full rounded-full border-main-gray-300 border-[1px] px-4 py-1 cursor-pointer hover:bg-main-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {displayText ? (
          <p>{displayText}</p>
        ) : (
          <p className="text-main-gray-400">{unSelectedText || '無選項'}</p>
        )}
        <i
          className={classNames(
            'ri-arrow-down-circle-fill text-main-blue text-2xl leading-6 transition',
            { 'rotate-180': isOpen }
          )}
        ></i>
      </button>

      {isOpen && (
        <div className="z-10 absolute translate-y-2 w-full border-[1px] border-main-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
          {list.map((item, index) => (
            <div
              className={classNames('px-4 py-3 cursor-pointer hover:bg-main-gray-200', {
                'border-b-[1px] border-main-gray-100': !(index === list.length - 1),
              })}
              key={item.value}
              onClick={() => setNewValue(item.value)}
            >
              {item.displayText ? item.displayText : <p>{item.text}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropDown
