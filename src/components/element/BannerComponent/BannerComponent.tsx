import { useContext } from 'react'
import classNames from 'classnames'

// types
import { IBanner } from '../../../types/editor'

// validate
import { urlValidate } from '../../../validator/commonValidate'

// images
import DefaultImage from '../../../assets/default.png'

// components
import AddImageButton from '../../common/AddImageButton'
import CircleButton from '../../common/CircleButton'
import ImgPathControl from '../../controls/ImgPathControl'
import BasicEditorContent from '../../text/BasicEditorContent'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function BannerComponent({
  schema,
  popupShowHandler,
  isButtonShow,
  setIsModalShow,
  isEditorMode,
}: {
  schema: IBanner
  popupShowHandler: () => void
  isButtonShow: boolean
  setIsModalShow?: (isShow: boolean) => void
  isEditorMode: boolean
}) {
  if (!schema) return null

  // console.log('schema', schema)

  const { previewMode } = useContext(EditorInfoContext)
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

        <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-stretch">
          {/* title */}
          {textShowChecks?.title && (
            <div className="mb-2">
              <BasicEditorContent schema={schema} controlName="title" />
            </div>
          )}

          {/* description */}
          {textShowChecks?.description && (
            <BasicEditorContent schema={schema} controlName="description" />
          )}

          <div className={classNames(buttonStyle, 'flex mt-7')}>
            <AddImageButton
              onClick={popupShowHandler}
              text="變更圖片"
              customClassNames="mr-2"
              isPreviewSmMode={previewMode === 'sm'}
            >
              <ImgPathControl uuid={uuid} />
            </AddImageButton>
            <CircleButton
              onClick={popupShowHandler}
              iconTag="ri-settings-3-fill"
              isPreviewSmMode={previewMode === 'sm'}
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
    </>
  )
}

export default BannerComponent
