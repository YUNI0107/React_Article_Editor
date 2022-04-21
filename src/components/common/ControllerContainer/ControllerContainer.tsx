import { Fragment } from 'react'

// types
import { IControlProps, IControls } from '../../../types/editor'

// components
import SwitchControl from '../SwitchControl'

// constants
import { controlContainerWidth } from '../../../constants/enums/otherEnums'

function ControllerContainer({
  uuid,
  order,
  controls,
  props,
}: {
  uuid?: string
  order?: number
  controls?: Array<IControls>
  props?: IControlProps
}) {
  if (!props || !controls || !uuid) return null

  return (
    <div className="bg-pink-300" style={{ width: `${controlContainerWidth}px` }}>
      {controls.map((control, index) => {
        return (
          <Fragment key={index}>
            {<SwitchControl control={control} props={props} order={order} uuid={uuid} />}
          </Fragment>
        )
      })}
    </div>
  )
}

export default ControllerContainer
