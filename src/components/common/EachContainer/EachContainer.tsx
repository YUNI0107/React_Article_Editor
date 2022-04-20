// components
import ImagesComponent from '../../element/ImagesComponent'

import { IImages } from '../../../types/editor'

interface IEachContainer {
  scheme: IImages
  PopupShowHandler: () => void
  isButtonShow: boolean
  isPopupShow: boolean
  setIsPopupShow: (isShow: boolean) => void
  distance: { top: number; left: number }
}

function EachContainer(props: IEachContainer) {
  const { scheme } = props

  switch (scheme.groupType) {
    case 'images':
      return <ImagesComponent {...props} />
    default:
      return <></>
  }
}

export default EachContainer
