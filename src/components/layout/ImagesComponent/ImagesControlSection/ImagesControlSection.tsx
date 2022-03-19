import { Fragment } from 'react'

// types
import { IControlProps, IControls } from '../../../../types/editor'

// components
import SwitchControl from '../../../common/SwitchControl'

function ImagesControlSection({
  controls,
  props,
  order,
}: {
  controls?: Array<IControls>
  props?: IControlProps
  order: number
}) {
  if (!props || !controls) return null

  return (
    <div>
      {controls.map((control, index) => {
        return (
          <Fragment key={index}>
            {<SwitchControl control={control} props={props} order={order} />}
          </Fragment>
        )
      })}
    </div>
  )
}

export default ImagesControlSection
