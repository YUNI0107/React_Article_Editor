import { useMemo } from 'react'
import classNames from 'classnames'

// types
import { IButton } from '../../../types/editor'

// components
import CircleButton from '../../common/CircleButton'
import BasicEditorContent from '../../text/BasicEditorContent'

function ButtonComponent({
  schema,
  popupShowHandler,
  isButtonShow,
  isEditorMode,
}: {
  schema: IButton
  popupShowHandler?: (index: null) => void
  isButtonShow?: boolean
  isEditorMode?: boolean
}) {
  if (!schema) return null
  const buttonStyle = isButtonShow ? 'block' : 'hidden pointer-events-none'

  const { props } = schema
  const {
    backgroundColor,
    borderWidth,
    borderColor,
    roundedKey,
    customRounded,
    padding: paddingProps,
    alignment,
    linkUrl,
    isLinkBlank,
    isIconShow,
    imgPath,
    scale: scaleProps,
    display: iconDisplay,
    buttonTextShowChecks,
  } = props || {
    backgroundColor: '#3742FA',
    borderWidth: 0,
    borderColor: '#0000',
    alignment: 'center',
    linkUrl: '',
    isLinkBlank: true,
    scale: {
      width: 0,
      height: 0,
    },
  }

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

  const padding = useMemo(() => {
    return `${paddingProps?.y || 0}px ${paddingProps?.x || 0}px`
  }, [paddingProps])

  const scale = useMemo(() => {
    return {
      with: scaleProps?.width || 0,
      height: scaleProps?.height || 0,
    }
  }, [scaleProps])

  const iconFlexDirection = useMemo(() => {
    switch (iconDisplay) {
      case 'left':
        return 'row'
      case 'right':
        return 'row-reverse'
      case 'top':
        return 'column'
      case 'bottom':
        return 'column-reverse'
      default:
        return 'row'
    }
  }, [iconDisplay])

  const iconMargin = useMemo(() => {
    switch (iconDisplay) {
      case 'left':
      case 'right':
        return '0px 5px'
      case 'top':
      case 'bottom':
        return '5px 0px'
      default:
        return '0px 0px'
    }
  }, [iconDisplay])

  const flexAlignment = useMemo(() => {
    switch (alignment) {
      case 'center':
        return 'center'
      case 'left':
        return 'flex-start'
      case 'right':
        return 'flex-end'
      default:
        return 'center'
    }
  }, [alignment])

  return (
    <>
      <div className="relative flex" style={{ justifyContent: flexAlignment }}>
        <div className="relative">
          {/* Button */}
          <div
            className="flex justify-center items-center"
            style={{
              ...(backgroundColor && { background: backgroundColor }),
              borderWidth,
              borderColor,
              borderRadius,
              padding,
              flexDirection: iconFlexDirection,
            }}
          >
            {isIconShow && (
              <img
                style={{ width: scale.with, height: scale.height, margin: iconMargin }}
                src={imgPath}
                alt="icon"
              />
            )}
            {buttonTextShowChecks && (
              <BasicEditorContent schema={schema} controlName="innerParagraph" />
            )}
          </div>

          {/* Editor Mode */}
          <div
            className={classNames(
              buttonStyle,
              'absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full'
            )}
          >
            <CircleButton
              onClick={() => popupShowHandler && popupShowHandler(null)}
              iconTag="ri-settings-3-fill "
              dataType="popupEdit"
              customClassNames="min-w-[24px] w-6 h-6"
              customIconClassNames="text-md"
            />
          </div>

          {/* Render Mode */}
          {linkUrl && !isEditorMode && (
            <a
              href={linkUrl}
              className="w-full h-full absolute top-0 left-0"
              target={isLinkBlank ? '_blank' : '_self'}
              rel="noreferrer"
            ></a>
          )}
        </div>
      </div>
    </>
  )
}

export default ButtonComponent
