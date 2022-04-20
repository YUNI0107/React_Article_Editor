import classNames from 'classnames'
import { useContext } from 'react'

// contexts
import { EditorInfoContext } from '../../../../contexts/EditorInfoContextSection'

function BackDevice() {
  const { previewMode } = useContext(EditorInfoContext)

  return (
    <div
      className={classNames(
        'fixed h-full left-1/2 -translate-x-1/2  bg-main-gray-300 rounded-[10px] z-10',
        {
          hidden: previewMode === 'lg',
          'max-h-mobile w-mobile pt-10 pb-16 px-4': previewMode === 'sm',
          'max-h-tablet w-tablet pt-10 pb-16 px-4': previewMode === 'md',
        }
      )}
    >
      <div className="w-full h-full bg-white"></div>
    </div>
  )
}

export default BackDevice
