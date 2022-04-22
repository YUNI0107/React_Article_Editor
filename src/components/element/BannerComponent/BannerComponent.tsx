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
}) {
  if (!scheme) return null

  const { props } = scheme
  const filterStyleClass = props?.filter
  const buttonStyle = isButtonShow ? 'block pointer-events-auto' : 'hidden pointer-events-none'

  return (
    <div>
      <div>
        <img
          className={classNames(filterStyleClass)}
          src={props?.imgPath || DefaultImage}
          alt="images"
        />
        <div onClick={PopupShowHandler} className={classNames(buttonStyle)}>
          編輯
        </div>
        <h1>Banner</h1>
      </div>
    </div>
  )
}

export default BannerComponent
