// type
import { IControlProps, IControls } from '../../../types/editor'

// components
import ImgPathControl from '../../controls/ImgPathControl'

function SwitchControl({
  control,
  props,
  order,
}: {
  control: IControls
  props: IControlProps
  order?: number
}) {
  switch (control) {
    case 'imgPathControl':
      return <ImgPathControl {...props} order={order} />
    default:
      return <></>
  }
}

export default SwitchControl
