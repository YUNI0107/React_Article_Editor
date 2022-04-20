import classNames from 'classnames'

// components
import PopUp from '../../common/Popup'
import ControllerContainer from '../../common/ControllerContainer'

// types
import { IBanner } from '../../../types/editor'

// images
import DefaultImage from '../../../assets/default.png'

function BannerComponent({
  scheme,
  PopupShowHandler,
  isButtonShow,
  isPopupShow,
  setIsPopupShow,
  distance,
}: {
  scheme: IBanner
  PopupShowHandler: () => void
  isButtonShow: boolean
  isPopupShow: boolean
  setIsPopupShow: (isShow: boolean) => void
  distance: { top: number; left: number }
}) {
  if (!scheme) return null

  const { uuid, controls, props } = scheme
  const buttonStyle = isButtonShow ? 'block pointer-events-auto' : 'hidden pointer-events-none'

  return (
    <div>
      <div>
        <img src={props?.imgPath || DefaultImage} alt="images" />
        <div onClick={PopupShowHandler} className={classNames(buttonStyle)}>
          編輯
        </div>
        <h1>Banner</h1>
      </div>

      <PopUp isPopupShow={isPopupShow} setIsPopupShow={setIsPopupShow} distance={distance}>
        <ControllerContainer props={props} controls={controls} uuid={uuid} />
      </PopUp>
    </div>
  )
}

export default BannerComponent
