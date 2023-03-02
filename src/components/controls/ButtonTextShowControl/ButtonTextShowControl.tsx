// types
import { GetValueFuncType, ChangeValueFuncType } from '../../../types/control'

// components
import ControllerTitle from '../components/ControllerTitle'
import CheckBoxButton from '../../common/CheckBoxButton'

function ButtonTextShowControl({
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

  const buttonTextShowChecks = getValue('buttonTextShowChecks', uuid, childUuid)

  // operations
  const onValueChange = () => {
    changeValue('buttonTextShowChecks', !buttonTextShowChecks, uuid, childUuid)
  }

  return (
    <>
      <ControllerTitle title="其他" />

      <div className="flex items-start">
        <CheckBoxButton
          value="button-text"
          name="text-show"
          id="button-text"
          onValueChange={onValueChange}
          checked={buttonTextShowChecks}
        />
        <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="button-text">
          新增按鈕內文字
        </label>
      </div>
    </>
  )
}

export default ButtonTextShowControl
