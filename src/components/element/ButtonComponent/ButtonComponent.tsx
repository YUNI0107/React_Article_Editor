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
}: //   isEditorMode,
{
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
  } = props || {
    backgroundColor: '#3742FA',
    borderWidth: 0,
    borderColor: '#0000',
  }

  const borderRadius = useMemo(() => {
    if (roundedKey === 'none') {
      return '0px'
    } else if (roundedKey === 'circle') {
      return '100%'
    } else {
      return `${customRounded?.leftTop || 0}px ${customRounded?.rightTop || 0}px ${
        customRounded?.rightBottom || 0
      }px ${customRounded?.leftBottom || 0}px`
    }
  }, [roundedKey, customRounded])

  const padding = useMemo(() => {
    return `${paddingProps?.x || 0}px ${paddingProps?.y || 0}px`
  }, [paddingProps])

  return (
    <>
      <div className="relative flex justify-center">
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
        </div>
      </div>
    </>
  )
}

export default ButtonComponent
