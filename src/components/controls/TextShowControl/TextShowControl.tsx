// types
import { ChangeValueFuncType, GetValueFuncType } from '../../../types/control'
import CheckBoxButton from '../../common/CheckBoxButton'

// components
import ControllerTitle from '../components/ControllerTitle'

function TextShowControl({
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
  const textShowChecks =
    (getValue('textShowChecks', uuid, childUuid) as {
      [key in 'title' | 'description']: boolean
    }) || {}

  const changeTextShowValue = (checkbox: 'title' | 'description', value: boolean) => {
    const checksObject = { ...textShowChecks, [checkbox]: value }
    changeValue('textShowChecks', checksObject, uuid, childUuid)
  }

  console.log('textShowChecks', textShowChecks)

  return (
    <>
      <ControllerTitle title="其他" />

      <div>
        <div className="flex items-start">
          <CheckBoxButton
            value="title"
            name="text-show"
            id="text-title"
            onValueChange={(value: boolean) => changeTextShowValue('title', value)}
            checked={textShowChecks.title}
          />
          <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="text-title">
            新增大標文字
          </label>
        </div>
        <div className="flex items-start">
          <CheckBoxButton
            value="description"
            name="text-show"
            id="text-description"
            onValueChange={(value: boolean) => changeTextShowValue('description', value)}
            checked={textShowChecks.description}
          />
          <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="text-description">
            新增敘述文字
          </label>
        </div>
      </div>
    </>
  )
}

export default TextShowControl
