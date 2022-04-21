import classNames from 'classnames'

// types
import { IBanner } from '../../../types/editor'

// images
import DefaultImage from '../../../assets/default.png'

function BannerComponent({
  scheme,
  PopupShowHandler,
  isButtonShow,
}: {
  scheme: IBanner
  PopupShowHandler: () => void
  isButtonShow: boolean
  isPopupShow: boolean
  setIsPopupShow: (isShow: boolean) => void
  distance: { top: number; left: number }
}) {
  if (!scheme) return null

  const { props } = scheme
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
    </div>
  )
}

export default BannerComponent
