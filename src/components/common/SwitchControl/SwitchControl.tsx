import { useContext } from 'react'

// type
import { IControlProps, IControls } from '../../../types/editor'

// components
import ImgPathControl from '../../controls/ImgPathControl'
import ImgFilterControl from '../../controls/ImgFilterControl'
import ClickEventControl from '../../controls/ClickEventControl'
import TextShowControl from '../../controls/TextShowControl'
import BackGroundControl from '../../controls/BackGroundControl'
import BorderControl from '../../controls/BorderControl'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'

function SwitchControl({
  control,
  focusProps,
  uuid,
  childUuid,
}: {
  control: IControls
  focusProps: IControlProps
  uuid: string
  childUuid?: string
}) {
  const { controlHandler } = useContext(SchemaContext)
  const controlProps = {
    childUuid,
    uuid,
    getValue: controlHandler?.getValue.bind(controlHandler),
    changeValue: controlHandler?.changeValue.bind(controlHandler),
    ...focusProps,
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
    case 'backGroundControl':
      return <BackGroundControl {...controlProps} />
    case 'borderWidthControl':
      return <BorderControl {...controlProps} />
    default:
      return <></>
  }
}

export default SwitchControl
