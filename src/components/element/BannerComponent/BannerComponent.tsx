// components
import PopUp from '../../common/Popup'
import ControllerContainer from '../../common/ControllerContainer'

// types
import { IBanner } from '../../../types/editor'

// images
import classNames from 'classnames'

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

  const { uuid, controls } = scheme
  const buttonStyle = isButtonShow ? 'block pointer-events-auto' : 'hidden pointer-events-none'

  return (
    <div>
      <div>
        <div onClick={PopupShowHandler} className={classNames(buttonStyle)}>
          編輯
        </div>
        <h1>Banner</h1>
      </div>

      <PopUp isPopupShow={isPopupShow} setIsPopupShow={setIsPopupShow} distance={distance}>
        <div className="bg-pink-300">
          <ControllerContainer controls={controls} uuid={uuid} />
        </div>
      </PopUp>
    </div>
  )
}

export default BannerComponent
