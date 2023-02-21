import { useMemo } from 'react'
import classNames from 'classnames'

// types
import { IButton } from '../../../types/editor'

// components
import CircleButton from '../../common/CircleButton'

function ButtonComponent({
  schema,
  popupShowHandler,
  isButtonShow,
  isEditorMode,
}: {
  schema: IButton
  popupShowHandler: () => void
  isButtonShow: boolean
  isEditorMode: boolean
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
  } = props || {
    backgroundColor: '#3742FA',
    borderWidth: 0,
    borderColor: '#0000',
    alignment: 'center',
    linkUrl: '',
    isLinkBlank: true,
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
    return `${paddingProps?.x || 0}px ${paddingProps?.y || 0}px`
  }, [paddingProps])

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
            style={{
              ...(backgroundColor && { background: backgroundColor }),
              borderWidth,
              borderColor,
              borderRadius,
              padding,
            }}
          >
            Button
          </div>

          {/* Editor Mode */}
          <div
            className={classNames(
              buttonStyle,
              'absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full'
            )}
          >
            <CircleButton
              onClick={popupShowHandler}
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
