// components
import ControllerTitle from '../components/ControllerTitle'
import BasicInput from '../../common/BasicInput'

// types
import { GetValueFuncType, ChangeValueFuncType } from '../../../types/control'

const PaddingInput = ({
  value,
  setValue,
  text,
}: {
  value: string
  setValue: (value: string) => void
  text?: string
}) => {
  return (
    <div className="flex items-center">
      <p className="text-xs whitespace-nowrap">{text || ''}</p>
      <div className="mx-1">
        <BasicInput type="number" value={value} setValue={setValue} customInputClassNames={'h-6'} />
      </div>
      <span className="text-xs">px</span>
    </div>
  )
}

function PaddingControl({
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

  const padding = getValue('padding', uuid, childUuid)

  // operations
  const setValue = (key: string, value: string) => {
    const customValues = {
      ...padding,
      [key]: parseInt(value),
    }

    changeValue('padding', customValues, uuid, childUuid)
  }
  return (
    <>
      <ControllerTitle title="間距" />

      <div className="flex justify-between">
        <i className="ri-space text-lg text-main-blue mr-1"></i>

        <div className="grid grid-cols-2 gap-x-2">
          {Object.entries(padding).map(([key, value], index) => {
            const inputValue = (value as number).toString()
            const textMap: Array<string> = ['上下', '左右']

            return (
              <PaddingInput
                key={key}
                value={inputValue}
                setValue={(value) => setValue(key, value)}
                text={textMap[index]}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default PaddingControl
