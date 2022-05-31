import classNames from 'classnames'
import { useContext } from 'react'

// utils
import ControlHandler from '../../../utils/controlHandler'

// contexts
import { SchemeContext } from '../../../contexts/SchemeContextSection'

// components
import ControllerTitle from '../components/ControllerTitle'

// images
import DefaultImage from '../../../assets/default.png'

//constants
import { filterControlList } from '../../../constants/controller'

const FilterBox = ({
  label,
  filterStyle,
  changeFilterValue,
}: {
  label: string
  filterStyle?: string
  changeFilterValue: (filter: string) => void
}) => {
  return (
    <div
      className="flex flex-col items-center"
      onClick={() => filterStyle && changeFilterValue(filterStyle)}
    >
      <div className="relative w-full pb-[100%] bg-purple-400 mb-1">
        <img
          src={DefaultImage}
          alt="demo"
          className={classNames('absolute top-0 left-0 w-full h-full object-cover', filterStyle)}
        />
      </div>
      <p className="text-[10px]">{label}</p>
    </div>
  )
}

function ImgFilterControl({ uuid, childUuid }: { uuid: string; childUuid?: string }) {
  const { schemes, handleScheme } = useContext(SchemeContext)
  const controlHandler = new ControlHandler('filter', schemes, handleScheme)

  const changeFilterValue = (filterStyle: string) => {
    // 這邊直接使用Tailwind作為className參數
    const filterClassName = filterStyle || ''
    controlHandler.changeValue(filterClassName, uuid, childUuid)
  }

  return (
    <div>
      <ControllerTitle title="圖片色彩模式" description="擇一調整圖片色彩" />

      <div className="grid grid-cols-3 gap-x-2 gap-y-4">
        {filterControlList.map((item, index) => {
          return (
            <FilterBox
              label={item.label}
              filterStyle={item.filterStyle}
              changeFilterValue={changeFilterValue}
              key={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ImgFilterControl
