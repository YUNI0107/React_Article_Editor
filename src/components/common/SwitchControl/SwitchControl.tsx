import { useContext } from 'react'

// type
import { IControlProps, IControls } from '../../../types/editor'

// components
import ImgPathControl from '../../controls/ImgPathControl'
import ImgFilterControl from '../../controls/ImgFilterControl'

// utils
import ControlHandler from '../../../utils/controlHandler'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'
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
  const { schemas, handleSchema } = useContext(SchemaContext)
  const controlHandler = new ControlHandler(schemas, handleSchema)
  const controlProps = {
    childUuid,
    uuid,
    getValue: controlHandler.getValue.bind(controlHandler),
    changeValue: controlHandler.changeValue.bind(controlHandler),
    ...props,
  }

  switch (control) {
    case 'imgPathControl':
      return <ImgPathControl {...controlProps} />
    case 'imgFilterControl':
      return <ImgFilterControl {...controlProps} />
    case 'clickEventControl':
      return <ClickEventControl {...controlProps} />
    default:
      return <></>
  }
}

export default SwitchControl
