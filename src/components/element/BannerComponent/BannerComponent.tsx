import classNames from 'classnames'

// types
import { IBanner } from '../../../types/editor'

// validate
import { urlValidate } from '../../../validator/commonValidate'

// images
import DefaultImage from '../../../assets/default.png'

function BannerComponent({
  schema,
  PopupShowHandler,
  isButtonShow,
  setIsModalShow,
}: {
  schema: IBanner
  PopupShowHandler: () => void
  isButtonShow: boolean
  setIsModalShow?: (isShow: boolean) => void
}) {
  if (!schema) return null

  const { props } = schema
  const filterStyleClass = props?.filter
  const buttonStyle = isButtonShow ? 'block pointer-events-auto' : 'hidden pointer-events-none'

  // operation
  const openImageModal = () => {
    if (!setIsModalShow || props?.clickEvent !== 'image-popup') return
    setIsModalShow(true)
  }

  return (
    <>
      <div>
        {/* image section */}
        <div
          className={classNames('relative w-full h-full', {
            'cursor-pointer': props?.clickEvent === 'image-popup',
          })}
          onClick={openImageModal}
        >
          <img
            className={classNames(filterStyleClass)}
            src={props?.imgPath || DefaultImage}
            alt="images"
          />
          {props?.linkUrl && urlValidate(props.linkUrl) && props?.clickEvent === 'link' && (
            <a
              href={props.linkUrl}
              className="w-full h-full absolute top-0 left-0"
              target="_blank"
              rel="noreferrer"
            ></a>
          )}
        </div>

        <div onClick={PopupShowHandler} className={classNames(buttonStyle)} data-type="popupEdit">
          編輯
        </div>
        <h1>Banner</h1>
      </div>
    </>
  )
}

export default BannerComponent
