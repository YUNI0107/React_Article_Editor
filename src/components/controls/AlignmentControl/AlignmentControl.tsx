import classNames from 'classnames'

// types
import { GetValueFuncType, ChangeValueFuncType, AlignmentType } from '../../../types/control'

// components
import ControllerTitle from '../components/ControllerTitle'

const AlignmentButton = ({
  name,
  alignment,
  changeAlignmentValue,
}: {
  name: AlignmentType
  alignment: AlignmentType
  changeAlignmentValue: (value: AlignmentType) => void
}) => {
  return (
    <button
      className={classNames(
        'text-xl  hover:text-main-blue p-1',
        alignment === name ? 'text-main-blue' : 'text-main-gray-400'
      )}
      onClick={() => changeAlignmentValue(name)}
    >
      <i className={classNames(`ri-align-${name}`)}></i>
    </button>
  )
}

function AlignmentControl({
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

  const alignmentMap: Array<AlignmentType> = ['left', 'center', 'right']
  const alignment = getValue('alignment', uuid, childUuid)

  // operations
  const changeAlignmentValue = (align: string) => {
    changeValue('alignment', align, uuid, childUuid)
  }

  return (
    <>
      <ControllerTitle title="排列樣式" />

      <div className="flex items-center">
        {alignmentMap.map((key) => (
          <AlignmentButton
            key={key}
            name={key}
            alignment={alignment}
            changeAlignmentValue={changeAlignmentValue}
          />
        ))}
      </div>
    </>
  )
}

export default AlignmentControl
