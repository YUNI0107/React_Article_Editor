import { useEffect, useState } from 'react'

// components
import ControllerTitle from '../components/ControllerTitle'
import ImgPathControl from '../ImgPathControl'
import CheckBoxButton from '../../common/CheckBoxButton'
import BasicInput from '../../common/BasicInput'

// types
import { GetValueFuncType, ChangeValueFuncType, ScaleType } from '../../../types/control'

// images
import TopIcon from '../../../assets/icon/top.png'
import BottomIcon from '../../../assets/icon/bottom.png'
import LeftIcon from '../../../assets/icon/left.png'
import RightIcon from '../../../assets/icon/right.png'
import classNames from 'classnames'

const positionList = [
  { value: 'top', text: '上方', icon: TopIcon },
  { value: 'bottom', text: '下方', icon: BottomIcon },
  { value: 'left', text: '左方', icon: LeftIcon },
  { value: 'right', text: '右方', icon: RightIcon },
]

const scaleTextList = ['寬度', '高度']

const ScaleInput = ({
  text,
  value,
  setValue,
  disabled,
}: {
  text: string
  value: string
  setValue: (value: string) => void
  disabled: boolean
}) => {
  return (
    <div className="flex items-center">
      <p className="text-xs whitespace-nowrap">{text || ''}</p>
      <div className="mx-1">
        <BasicInput
          type="number"
          value={value}
          setValue={setValue}
          customInputClassNames={'h-6'}
          disabled={disabled}
        />
      </div>
      <span className="text-xs">px</span>
    </div>
  )
}

const PositionButton = ({
  value,
  icon,
  text,
  checked,
  handleDisplayChange,
}: {
  value: string
  icon: string
  text: string
  checked: boolean
  handleDisplayChange: (value: string) => void
}) => {
  return (
    <button
      className={classNames('flex flex-col p-1 items-center', {
        'border-2 border-main-blue': checked,
      })}
      onClick={() => handleDisplayChange(value)}
    >
      <div className="h-6 mb-1">
        <img src={icon} alt={value} className="object-contain w-full h-full" />
      </div>
      <p className="text-xs">{text}</p>
    </button>
  )
}

function IconControl({
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

  const [ratioIconScale, setRatioIconScale] = useState<ScaleType | null>(null)
  const [isImagePathChange, setIsImagePathChange] = useState(false)

  const isIconShow = getValue('isIconShow', uuid, childUuid)
  const iconDisplay = getValue('display', uuid, childUuid)
  const scale = getValue('scale', uuid, childUuid)
  const isInScale = getValue('isInScale', uuid, childUuid)
  const iconPath = getValue('imgPath', uuid, childUuid)

  //  operation
  const handleShowCheckbox = (value: boolean) => {
    changeValue('isIconShow', value, uuid, childUuid)
  }

  const handleDisplayChange = (value: string) => {
    changeValue('display', value, uuid, childUuid)
  }

  const handleIsInScaleChange = () => {
    changeValue('isInScale', !isInScale, uuid, childUuid)
  }

  const setScaleValue = (key: keyof ScaleType, value: string) => {
    if (!ratioIconScale) return

    const targetValue = parseInt(value)

    const scaleResult: { [key in keyof ScaleType]: number } = {
      ...scale,
    }

    if (isInScale) {
      const multiplyNumber = targetValue / ratioIconScale[key]
      scaleResult.width = key === 'width' ? targetValue : ratioIconScale.width * multiplyNumber
      scaleResult.height = key === 'height' ? targetValue : ratioIconScale.height * multiplyNumber
    } else {
      scaleResult[key] = targetValue
    }

    changeValue('scale', scaleResult, uuid, childUuid)
  }

  const onImgPathChange = () => {
    setIsImagePathChange(true)
  }

  const updateImageScale = (isUpdateScale = false) => {
    setRatioIconScale(null)
    changeValue('isInScale', true, uuid, childUuid)

    const img = new Image()
    img.onload = () => {
      const result = { width: img.width, height: img.height }
      setRatioIconScale(result)

      if (isUpdateScale) changeValue('scale', result, uuid, childUuid)
    }

    img.src = iconPath
  }

  // effects
  useEffect(() => {
    // Just update icon ratio for calculate
    updateImageScale(false)
  }, [])

  useEffect(() => {
    if (isImagePathChange && iconPath) {
      updateImageScale(true)
      setIsImagePathChange(false)
    }
  }, [iconPath, isImagePathChange])

  useEffect(() => {
    if (!isInScale) return

    if (scale.width >= scale.height) {
      setScaleValue('width', scale.width)
    } else {
      setScaleValue('height', scale.height)
    }
  }, [isInScale])

  return (
    <>
      <ControllerTitle title="圖標" />

      {/* Icon Checked */}
      <div className="flex items-start">
        <CheckBoxButton
          value="show"
          name="icon-show-check"
          id="show"
          onValueChange={handleShowCheckbox}
          checked={isIconShow}
        />
        <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="show">
          新增圖案內按鈕
        </label>
      </div>

      {isIconShow && (
        <>
          <div className="grid grid-cols-4 gap-x-2 my-4">
            {positionList.map((item) => (
              <PositionButton
                key={item.value}
                checked={iconDisplay === item.value}
                handleDisplayChange={handleDisplayChange}
                {...item}
              />
            ))}
          </div>

          <div className="flex justify-between mb-2">
            <i
              className={classNames(
                'ri-shape-fill text-lg mr-1 cursor-pointer active:text-secondary-blue-200',
                { 'hover:text-main-gray-400': !isInScale },
                isInScale ? 'text-main-blue' : 'text-main-gray-300'
              )}
              onClick={handleIsInScaleChange}
            ></i>

            <div className="grid grid-cols-2 gap-x-2 ">
              {Object.entries(scale).map(([key, value], index) => {
                const text = scaleTextList[index]
                const inputValue = (value as number).toString()

                return (
                  <ScaleInput
                    key={key}
                    text={text}
                    value={inputValue}
                    setValue={(value: string) => setScaleValue(key as keyof ScaleType, value)}
                    disabled={!ratioIconScale}
                  />
                )
              })}
            </div>
          </div>

          <div className="relative flex justify-center items-center rounded-2xl border-[1px] hover:bg-main-gray-100">
            <i className="ri-image-add-fill text-lg mr-2"></i>
            <p className="text-xs">變更圖標</p>
            <div className="absolute w-full h-full top-0 left-0">
              <ImgPathControl uuid={uuid} childUuid={childUuid} onImgPathChange={onImgPathChange} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default IconControl
