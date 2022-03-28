import { Fragment } from 'react'

// types
import { IControlProps, IControls } from '../../../../../types/editor'

// components
import SwitchControl from '../../../../common/SwitchControl'

function ImagesControlSection({
  order,
  uuid,
  controls,
  props,
}: {
  order: number
  uuid: string
  controls?: Array<IControls>
  props?: IControlProps
}) {
  if (!props || !controls) return null

  return (
    <div>
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

export default ImagesControlSection
