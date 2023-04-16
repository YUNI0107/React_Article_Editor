import { ReactNode, useContext } from 'react'
import classNames from 'classnames'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function IconRectangleButton({
  children,
  text,
  customClassNames,
  onClick,
  dataType,
  icon,
}: {
  children?: ReactNode
  text: string
  customClassNames?: string
  onClick?: () => void
  dataType?: string
  icon: string
}) {
  const { previewMode } = useContext(EditorInfoContext)
  const isPreviewSmMode = previewMode === 'sm'

  // operations
  const handleOnClick = () => {
    if (children || !onClick) return
    onClick()
  }

  return (
    <button
      onClick={handleOnClick}
      className={classNames(
        'px-10 py-2 flex flex-wrap justify-center items-center text-main-gray-500 bg-white rounded-3xl drop-shadow-lg overflow-hidden hover:brightness-90',
        { '!px-5 min-w-[150px]': isPreviewSmMode },
        customClassNames
      )}
      data-type={dataType}
    >
      {children && <div className="absolute top-0 left-0 w-full h-full">{children}</div>}
      <i className={classNames('text-3xl mx-3', icon, { 'text-2xl': isPreviewSmMode })}></i>
      <h2 className={classNames('text-md font-bold', { '!text-sm': isPreviewSmMode })}>{text}</h2>
    </button>
  )
}

export default IconRectangleButton
