import classNames from 'classnames'

// components
import ControllerTitle from '../components/ControllerTitle'

// images
import DefaultImage from '../../../assets/default.png'

//constants
import { filterControlList } from '../../../constants/controller'

// types
import { ChangeValueFuncType, GetValueFuncType } from '../../../types/control'

const FilterBox = ({
  label,
  filterStyle,
  selected,
  changeFilterValue,
}: {
  label: string
  filterStyle: string
  selected: boolean
  changeFilterValue: (filter: string) => void
}) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => changeFilterValue(filterStyle)}
    >
      <div className="relative w-full pb-[100%] box-border">
        <div
          className={classNames('absolute top-0 left-0 w-full h-full', {
            'border-[2px] border-main-blue': selected,
          })}
        >
          <img
            src={DefaultImage}
            alt="demo"
            className={classNames('absolute top-0 left-0 w-full h-full object-cover', filterStyle)}
          />
        </div>
      </div>
      <p className="text-[10px]">{label}</p>
    </div>
  )
}

function ImgFilterControl({
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
  const filter = getValue('filter', uuid, childUuid) || ''

  const changeFilterValue = (filterStyle: string) => {
    // 這邊直接使用Tailwind作為className參數
    const filterClassName = filterStyle || ''
    changeValue('filter', filterClassName, uuid, childUuid)
  }

  return (
    <div>
      <ControllerTitle title="圖片色彩模式" description="擇一調整圖片色彩" />

      <div className="grid grid-cols-3 gap-x-2 gap-y-4">
        {filterControlList.map((item, index) => {
          const selected = filter === item.filterStyle

          return (
            <div key={index}>
              <FilterBox
                label={item.label}
                filterStyle={item.filterStyle}
                changeFilterValue={changeFilterValue}
                selected={selected}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImgFilterControl
