// components
import BannerComponent from '../../../element/BannerComponent'

// types
import { ISingleSchema } from '../../../../types/editor'

interface IEachContainer {
  scheme: ISingleSchema
  PopupShowHandler: () => void
  isButtonShow: boolean
  distance: { top: number; left: number }
}

function EachContainer(props: IEachContainer) {
  const { scheme } = props

  switch (scheme.groupType) {
    case 'banner':
      return <BannerComponent {...props} scheme={scheme} />
    default:
      return <></>
  }
}

export default EachContainer
