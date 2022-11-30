import { useContext } from 'react'

// type
import { IControlProps, IControls } from '../../../types/editor'

// components
import ImgPathControl from '../../controls/ImgPathControl'
import ImgFilterControl from '../../controls/ImgFilterControl'
import ClickEventControl from '../../controls/ClickEventControl'
import TextShowControl from '../../controls/TextShowControl'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'

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
  const { controlHandler } = useContext(SchemaContext)
  const controlProps = {
    childUuid,
    uuid,
    getValue: controlHandler?.getValue.bind(controlHandler),
    changeValue: controlHandler?.changeValue.bind(controlHandler),
    ...props,
  }

  switch (control) {
    case 'imgPathControl':
      return <ImgPathControl {...controlProps} />
    case 'imgFilterControl':
      return <ImgFilterControl {...controlProps} />
    case 'clickEventControl':
      return <ClickEventControl {...controlProps} />
    case 'textShowControl':
      return <TextShowControl {...controlProps} />
    default:
      return <></>
  }
}

export default SwitchControl
