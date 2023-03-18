// components
import BannerComponent from '../../../element/BannerComponent'
import ButtonComponent from '../../../element/ButtonComponent'
import ImagesComponent from '../../../element/ImagesComponent'
import ParagraphComponent from '../../../element/ParagraphComponent'

// types
import { IComponentSchema } from '../../../../types/editor'
import { groupTypeEnum } from '../../../../constants/enums/editorEnums'

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
    case groupTypeEnum.banner:
      return <BannerComponent {...props} schema={schema} />
    case groupTypeEnum.button:
      return <ButtonComponent {...props} schema={schema} />
    case groupTypeEnum.images:
      return <ImagesComponent {...props} schema={schema} />
    case groupTypeEnum.paragraph:
      return <ParagraphComponent {...props} schema={schema} />
    default:
      return <h1>Please Check is component exist or not.</h1>
  }
}

export default EachContainer
