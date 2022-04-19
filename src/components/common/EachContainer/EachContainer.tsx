// components
import ImagesComponent from '../../element/ImagesComponent'

import { IImages } from '../../../types/editor'

const EachContainer = ({
  scheme,
  PopupShowHandler,
  isButtonShow,
  isPopupShow,
  setIsPopupShow,
  distance,
}: {
  scheme: IImages
  PopupShowHandler: () => void
  isButtonShow: boolean
  isPopupShow: boolean
  setIsPopupShow: (isShow: boolean) => void
  distance: { top: number; left: number }
}) => {
  return (
    <>
      <ImagesComponent
        scheme={scheme}
        PopupShowHandler={PopupShowHandler}
        isButtonShow={isButtonShow}
        isPopupShow={isPopupShow}
        setIsPopupShow={setIsPopupShow}
        distance={distance}
      />
    </>
  )
}

export default EachContainer
