import classNames from 'classnames'

// types
import { IBanner } from '../../../types/editor'

// images
import DefaultImage from '../../../assets/default.png'

function BannerComponent({
  schema,
  PopupShowHandler,
  isButtonShow,
}: {
  schema: IBanner
  PopupShowHandler: () => void
  isButtonShow: boolean
}) {
  if (!schema) return null

  const { props } = schema
  const filterStyleClass = props?.filter
  const buttonStyle = isButtonShow ? 'block pointer-events-auto' : 'hidden pointer-events-none'

  return (
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
  )
}

export default BannerComponent
