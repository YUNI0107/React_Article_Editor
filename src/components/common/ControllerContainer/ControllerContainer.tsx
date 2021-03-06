import { useContext, useMemo } from 'react'

// types
import { groupTypes, IControlProps, IControls } from '../../../types/editor'

// components
import SwitchControl from '../SwitchControl'

// constants
import { groupTypeEnum } from '../../../constants/enums/editorEnums'
import { controlContainerWidth } from '../../../constants/enums/otherEnums'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function ControllerContainer({
  uuid,
  childUuid,
  controls,
  props,
  groupName,
}: {
  uuid?: string
  childUuid?: string
  controls?: Array<IControls>
  props?: IControlProps
  groupName?: groupTypes
}) {
  if (!props || !controls || !uuid) return null

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
      style={{ width: `${controlContainerWidth}px` }}
    >
      {/* header */}
      <div className="bg-main-blue w-full px-3 py-2 flex justify-between items-center">
        <h1 className="text-base text-white font-bold">{controllerName}設定</h1>
        <button onClick={() => setIsPopupShow(false)}>
          <i className="ri-close-fill text-[28px] text-white hover:text-main-gray-300"></i>
        </button>
      </div>
      {/* bottom */}
      <div className="px-3 py-2">
        {controls.map((control, index) => {
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
