import { useState } from 'react'
import classNames from 'classnames'

// types
import { IBanner } from '../../../types/editor'

// validate
import { urlValidate } from '../../../validator/commonValidate'

// images
import DefaultImage from '../../../assets/default.png'

// components
import IconRectangleButton from '../../common/IconRectangleButton/IconRectangleButton'
import CircleButton from '../../common/CircleButton'
import ImgPathControl from '../../controls/ImgPathControl'
import TextContent from '../../text/TextContent'
import ModalBackground from '../../common/ModalBackground/ModalBackground'

function BannerComponent({
  schema,
  popupShowHandler,
  isButtonShow,
  setIsModalShow,
  isEditorMode,
}: {
  schema: IBanner
  popupShowHandler?: (index: null) => void
  isButtonShow?: boolean
  setIsModalShow?: (isShow: boolean, index?: number) => void
  isEditorMode?: boolean
}) {
  if (!schema) return null

  const [isLoading, setIsLoading] = useState(false)
  const { props, uuid } = schema
  const { filter: filterStyleClass, textShowChecks } = props || {}

  const buttonStyle = isButtonShow ? 'block' : 'hidden pointer-events-none'

  // operation
  const openImageModal = () => {
    if (!setIsModalShow || props?.clickEvent !== 'image-popup' || isEditorMode) return
    setIsModalShow(true)
  }

  return (
    <>
      <div className="relative">
        {/* image section */}
        <div
          className={classNames('relative w-full h-full', {
            'cursor-pointer': props?.clickEvent === 'image-popup',
          })}
          onClick={openImageModal}
        >
          <img
            className={classNames('w-full', filterStyleClass)}
            src={props?.imgPath || DefaultImage}
            alt="images"
          />

          {props?.linkUrl &&
            urlValidate(props.linkUrl) &&
            props?.clickEvent === 'link' &&
            !isEditorMode && (
              <a
                href={props.linkUrl}
                className="w-full h-full absolute top-0 left-0"
                target="_blank"
                rel="noreferrer"
              ></a>
            )}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">
          {/* title */}
          {textShowChecks?.title && (
            <div className="mb-2">
              <TextContent isEditorMode={isEditorMode} schema={schema} controlName="title" />
            </div>
          )}

          {/* description */}
          {textShowChecks?.description && (
            <TextContent isEditorMode={isEditorMode} schema={schema} controlName="description" />
          )}

          <div className={classNames(buttonStyle, 'flex mt-7 w-full justify-center')}>
            <IconRectangleButton
              icon="ri-image-add-fill"
              onClick={() => popupShowHandler && popupShowHandler(null)}
              text="變更圖片"
              customClassNames="mr-2"
              disabled={isLoading}
            >
              <ImgPathControl uuid={uuid} setIsLoading={setIsLoading} />
            </IconRectangleButton>
            <CircleButton
              onClick={() => popupShowHandler && popupShowHandler(null)}
              iconTag="ri-settings-3-fill"
              dataType="popupEdit"
            />
          </div>
        </div>

        <div
          className={classNames(
            buttonStyle,
            'absolute top-0 left-0 z-10 w-full h-full bg-white opacity-20 pointer-events-none'
          )}
        ></div>
      </div>

      <ModalBackground isModalShow={isLoading}>
        <i className="ri-loader-2-line text-5xl mr-2 text-white animate-spin"></i>
        <h2 className="text-2xl text-white font-semibold">Uploading Image...</h2>
      </ModalBackground>
    </>
  )
}

export default BannerComponent
