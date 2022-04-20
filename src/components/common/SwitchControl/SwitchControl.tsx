// type
import { IControlProps, IControls } from '../../../types/editor'

// components
import ImgPathControl from '../../controls/ImgPathControl'

function SwitchControl({
  control,
  props,
  uuid,
  order,
}: {
  control: IControls
  props: IControlProps
  uuid: string
  order?: number
}) {
  switch (control) {
    case 'imgPathControl':
      return <ImgPathControl {...props} order={order} uuid={uuid} />
    default:
      return <></>
  }
}

export default SwitchControl
