import { useContext, useMemo } from 'react'
import { ConnectDragSource } from 'react-dnd'

// types
import { groupTypes, IControlProps } from '../../../types/editor'

// components
import SwitchControl from '../SwitchControl'

// constants
import { groupTypeEnum } from '../../../constants/enums/editorEnums'
import { containerWidth, CONTROLLER_MAP } from '../../../constants/enums/otherEnums'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function ControllerContainer({
  uuid,
  childUuid,
  props,
  groupName,
  drag,
}: {
  uuid?: string
  childUuid?: string
  props?: IControlProps
  groupName?: groupTypes
  drag: ConnectDragSource
}) {
  if (!props || !groupName || !uuid) return null

  const { setIsPopupShow } = useContext(EditorInfoContext)

  // memos
  const controllerName = useMemo(() => {
    switch (groupName) {
      case groupTypeEnum.banner:
        return '帶狀圖片'
      default:
        return ''
    }
  }, [groupName])

  return (
    <div
      className="bg-white rounded-lg overflow-hidden basic-shadow"
      style={{ width: `${containerWidth}px` }}
    >
      {/* header */}
      <div
        ref={drag}
        className="bg-main-blue w-full px-3 py-2 flex justify-between items-center cursor-move"
      >
        <h1 className="text-base text-white font-bold">{controllerName}設定</h1>
        <button onClick={() => setIsPopupShow(false)}>
          <i className="ri-close-fill text-[28px] text-white hover:text-main-gray-300"></i>
        </button>
      </div>
      {/* bottom */}
      <div className="px-3 py-2">
        {CONTROLLER_MAP[groupName].map((control, index) => {
          return (
            <div className="py-2" key={index}>
              <SwitchControl control={control} props={props} childUuid={childUuid} uuid={uuid} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ControllerContainer
