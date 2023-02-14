// components
import BannerComponent from '../../../element/BannerComponent'
import ButtonComponent from '../../../element/ButtonComponent'

// types
import { ISingleSchema } from '../../../../types/editor'

interface IEachContainer {
  schema: ISingleSchema
  popupShowHandler: () => void
  isButtonShow: boolean
  distance: { top: number; left: number }
  isEditorMode: boolean
}

function SingleEachContainer(props: IEachContainer) {
  const { schema } = props

  switch (schema.groupType) {
    case 'banner':
      return <BannerComponent {...props} schema={schema} />
    case 'button':
      return <ButtonComponent {...props} schema={schema} />
    default:
      return <></>
  }
}

export default SingleEachContainer
