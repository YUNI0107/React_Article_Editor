import classNames from 'classnames'

//components
import ControllerTitle from '../components/ControllerTitle'
import RadioButton from '../../common/RadioButton'
import BasicInput from '../../common/BasicInput'

// types
import {
  ChangeValueFuncType,
  GetValueFuncType,
  RoundedType,
  RoundedCustomInputType,
} from '../../../types/control'

const CustomRoundedInput = ({
  value,
  setValue,
  rotation,
}: {
  value: string
  setValue: (value: string) => void
  rotation?: string
}) => {
  return (
    <div className="flex items-center">
      <i className={classNames('ri-rounded-corner text-main-blue text-lg', rotation)}></i>
      <div className="mx-1">
        <BasicInput
          type={'number'}
          value={value}
          setValue={setValue}
          customInputClassNames={'h-6'}
        />
      </div>
      <span className="text-xs">px</span>
    </div>
  )
}

const CustomRoundedSection = ({
  customRounded,
  changeValue,
}: {
  customRounded: RoundedCustomInputType
  changeValue: (value: RoundedCustomInputType) => void
}) => {
  const setValue = (key: string, value: string) => {
    const customValues = {
      ...customRounded,
      [key]: parseInt(value),
    }

    changeValue(customValues)
  }

  return (
    <div className="grid grid-cols-2 gap-y-2 gap-x-2 mt-2">
      {Object.entries(customRounded).map(([key, value], index) => {
        const inputValue = (value as number).toString()
        const rotationMap: Array<string> = ['-rotate-90', '', 'rotate-90', 'rotate-180']

        return (
          <CustomRoundedInput
            key={key}
            value={inputValue}
            setValue={(value) => setValue(key, value)}
            rotation={rotationMap[index]}
          />
        )
      })}
    </div>
  )
}

function RoundedControl({
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

  const roundedKey = getValue('roundedKey', uuid, childUuid)
  const customRounded = getValue('customRounded', uuid, childUuid)

  // operations
  const changeTypeValue = (type: RoundedType) => {
    changeValue('roundedKey', type, uuid, childUuid)
  }

  const changeCustomValue = (customInputs: RoundedCustomInputType) => {
    changeValue('customRounded', customInputs, uuid, childUuid)
  }

  return (
    <>
      <ControllerTitle title="圓角" />
      <div className="flex items-start mb-2">
        <RadioButton
          value="none"
          name="rounded"
          id="none-rounded"
          onValueChange={changeTypeValue}
          checked={roundedKey === 'none'}
        />
        <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="none-rounded">
          無
        </label>
      </div>

      <div className="flex items-start mb-2">
        <RadioButton
          value="circle"
          name="rounded"
          id="circle-rounded"
          onValueChange={changeTypeValue}
          checked={roundedKey === 'circle'}
        />
        <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="circle-rounded">
          圓形
        </label>
      </div>

      <div className="flex items-start">
        <RadioButton
          value="custom"
          name="rounded"
          id="custom-rounded"
          onValueChange={changeTypeValue}
          checked={roundedKey === 'custom'}
        />
        <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="custom-rounded">
          自訂圓角
        </label>
      </div>

      {roundedKey === 'custom' && (
        <CustomRoundedSection customRounded={customRounded} changeValue={changeCustomValue} />
      )}
    </>
  )
}

export default RoundedControl
