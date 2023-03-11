import { ConnectDragSource } from 'react-dnd'

// types
import { groupTypes, IControlProps } from '../../../types/editor'

// components
import SwitchControl from '../SwitchControl'

// constants
import { CONTROLLER_MAP } from '../../../constants/enums/otherEnums'

// contexts
import PopupContainer from '../PopupContainer'

function ControllerContainer({
  uuid,
  childUuid,
  focusProps,
  groupName,
  controllerName,
  drag,
}: {
  uuid?: string
  childUuid?: string
  focusProps?: IControlProps
  groupName?: groupTypes
  controllerName: string
  drag: ConnectDragSource
}) {
  if (!focusProps || !groupName || !uuid) return null

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
