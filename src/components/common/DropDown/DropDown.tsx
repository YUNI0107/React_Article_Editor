// types
import classNames from 'classnames'
import { IDropDownListItem } from '../../../types/layout'

function DropDown({
  list,
  isOpen,
  setIsOpen,
}: {
  list: Array<IDropDownListItem>
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}) {
  return (
    <div className="relative">
      <div
        className="flex items-center justify-between w-full rounded-full border-main-gray-300 border-[1px] px-4 py-1 cursor-pointer hover:bg-main-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>大標題</p>
        <i className="ri-arrow-down-circle-fill text-main-blue text-2xl leading-6"></i>
      </div>

      {isOpen && (
        <div className="absolute translate-y-2 w-full ring-1 ring-main-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
          {list.map((item, index) => (
            <div
              className={classNames('px-4 py-3 cursor-pointer hover:bg-main-gray-200', {
                'border-b-[1px] border-main-gray-100': !(index === list.length - 1),
              })}
              key={item.value}
            >
              {typeof item.info === 'string' ? <p>{item.info}</p> : item.info}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropDown
