import { useMemo } from 'react'
import { ConnectDragSource } from 'react-dnd'

// types
import { groupTypes, IControlProps } from '../../../types/editor'

// components
import SwitchControl from '../SwitchControl'

// constants
import { groupTypeEnum } from '../../../constants/enums/editorEnums'
import { CONTROLLER_MAP } from '../../../constants/enums/otherEnums'

// contexts
import PopupContainer from '../PopupContainer'

function ControllerContainer({
  uuid,
  childUuid,
  focusProps,
  groupName,
  drag,
}: {
  uuid?: string
  childUuid?: string
  focusProps?: IControlProps
  groupName?: groupTypes
  drag: ConnectDragSource
}) {
  if (!focusProps || !groupName || !uuid) return null

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
    <PopupContainer title={controllerName} drag={drag}>
      {CONTROLLER_MAP[groupName].map((control, index) => {
        return (
          <div className="py-2" key={index}>
            <SwitchControl
              control={control}
              focusProps={focusProps}
              childUuid={childUuid}
              uuid={uuid}
            />
          </div>
        )
      })}
    </PopupContainer>
  )
}

export default ControllerContainer
