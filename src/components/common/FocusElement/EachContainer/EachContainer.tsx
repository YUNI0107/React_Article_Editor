// components
import BannerComponent from '../../../element/BannerComponent'
import ButtonComponent from '../../../element/ButtonComponent'
import ImagesComponent from '../../../element/ImagesComponent'

// types
import { IComponentSchema } from '../../../../types/editor'

interface IEachContainer {
  schema: IComponentSchema
  popupShowHandler: (index: number | null) => void
  isButtonShow: boolean
  distance: { top: number; left: number }
  isEditorMode: boolean
}
function EachContainer(props: IEachContainer) {
  const { schema } = props

  switch (schema.groupType) {
    case 'banner':
      return <BannerComponent {...props} schema={schema} />
    case 'button':
      return <ButtonComponent {...props} schema={schema} />
    case 'images':
      return <ImagesComponent {...props} schema={schema} />
    default:
      return <h1>Please Check is component exist or not.</h1>
  }
}

export default EachContainer
