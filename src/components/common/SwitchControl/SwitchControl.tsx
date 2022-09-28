// type
import { IControlProps, IControls } from '../../../types/editor'

// components
import ImgPathControl from '../../controls/ImgPathControl'
import ImgFilterControl from '../../controls/ImgFilterControl'
import ClickEventControl from '../../controls/ClickEventControl'

function SwitchControl({
  control,
  props,
  uuid,
  childUuid,
}: {
  control: IControls
  props: IControlProps
  uuid: string
  childUuid?: string
}) {
  console.log(control)

  switch (control) {
    case 'imgPathControl':
      return <ImgPathControl {...props} childUuid={childUuid} uuid={uuid} />
    case 'imgFilterControl':
      return <ImgFilterControl {...props} childUuid={childUuid} uuid={uuid} />
    case 'clickEventControl':
      return <ClickEventControl {...props} childUuid={childUuid} uuid={uuid} />
    default:
      return <></>
  }
}

export default SwitchControl
