import { useMemo, useContext } from 'react'
import classNames from 'classnames'

// types
import { IComponentSchema, IImage, imagesType } from '../../../../types/editor'

// contexts
import { EditorInfoContext } from '../../../../contexts/EditorInfoContextSection'
import BasicEditorContent from '../../../text/BasicEditorContent'

// components
import IconRectangleButton from '../../../common/IconRectangleButton/IconRectangleButton'
import ImgPathControl from '../../../controls/ImgPathControl'
import CircleButton from '../../../common/CircleButton'

// utils
import { urlValidate } from '../../../../validator/commonValidate'
import getStyleSetting, { IStyleMapList } from '../../../../utils/getStyleSetting'

const styleMapList: IStyleMapList = {
  publish: 'mb-4 md:mb-0',
  editor: {
    sm: 'mb-4',
  },
}

function ImageComponent({
  schema,
  type,
  parentSchema,
  popupShowHandler,
  isEditorMode,
  setIsModalShow,
}: {
  schema: IImage
  type: imagesType
  parentSchema?: IComponentSchema
  popupShowHandler: () => void
  isEditorMode: boolean
  setIsModalShow?: (isShow: boolean) => void
}) {
  const { previewMode } = useContext(EditorInfoContext)
  const styleSetting = getStyleSetting(styleMapList, previewMode, isEditorMode)

  const { props, uuid } = schema || {}
  const { uuid: parentUuid, props: parentProps } = parentSchema || {}
  const { customRounded, roundedKey } = parentProps || {}
  const { filter: filterStyleClass, textShowChecks } = props || {}

  const pathControlUuidMap = parentUuid
    ? {
        uuid: parentUuid,
        childUuid: uuid,
      }
    : {
        uuid: uuid,
      }

  const imageRatio = useMemo(() => {
    switch (type) {
      case 'triplicate-square':
      case 'triplicate-circle':
      case 'double-square':
      case 'double-circle':
        return '100%'
      case 'triplicate-rectangle':
      case 'double-rectangle':
        return '60%'
      default:
        return '100%'
    }
  }, [])

  const borderRadius = useMemo(() => {
    switch (roundedKey) {
      case 'none':
        return '0px'
      case 'circle':
        return '100%'
      case 'custom':
        return `${customRounded?.leftTop || 0}px ${customRounded?.rightTop || 0}px ${
          customRounded?.rightBottom || 0
        }px ${customRounded?.leftBottom || 0}px`
    }
  }, [roundedKey, customRounded])

  // operations
  const openImageModal = () => {
    if (!setIsModalShow || props?.clickEvent !== 'image-popup' || isEditorMode) return
    setIsModalShow(true)
  }

  return (
    <div className={styleSetting}>
      <div
        className={classNames('relative group overflow-hidden', {
          'cursor-pointer': props?.clickEvent === 'image-popup',
        })}
        style={{ paddingTop: imageRatio, borderRadius }}
        onClick={openImageModal}
      >
        <img
          className={classNames(
            'z-10 absolute top-0 left-0 w-full h-full object-cover',
            filterStyleClass
          )}
          src={props?.imgPath}
        />

        {props?.linkUrl &&
          urlValidate(props.linkUrl) &&
          props?.clickEvent === 'link' &&
          !isEditorMode && (
            <a
              href={props.linkUrl}
              className="z-30 w-full h-full absolute top-0 left-0"
              target="_blank"
              rel="noreferrer"
            ></a>
          )}

        <div
          className={classNames(
            'z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col hidden justify-center items-center ',
            {
              'group-hover:flex': isEditorMode,
            }
          )}
        >
          <IconRectangleButton
            icon="ri-image-add-fill"
            onClick={popupShowHandler}
            text="變更圖片"
            customClassNames="mb-2 !py-2 !px-4"
          >
            <ImgPathControl
              uuid={pathControlUuidMap.uuid}
              childUuid={pathControlUuidMap.childUuid}
            />
          </IconRectangleButton>

          <CircleButton
            onClick={popupShowHandler}
            iconTag="ri-settings-3-fill"
            dataType="popupEdit"
          />
        </div>
      </div>

      {parentSchema && (textShowChecks?.title || textShowChecks?.description) && (
        <div className="flex flex-col justify-center items-center mt-5">
          {/* title */}
          {textShowChecks?.title && (
            <div className="mb-2">
              <BasicEditorContent
                schema={parentSchema}
                childUuid={schema.uuid}
                controlName="title"
              />
            </div>
          )}

          {/* description */}
          {textShowChecks?.description && (
            <BasicEditorContent
              schema={parentSchema}
              childUuid={schema.uuid}
              controlName="description"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default ImageComponent
