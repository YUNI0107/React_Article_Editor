import classNames from 'classnames'
import { useContext } from 'react'

// contexts
import { EditorInfoContext } from '../../../../contexts/EditorInfoContextSection'

function BackDevice() {
  const { previewMode } = useContext(EditorInfoContext)

  return (
    <div
      className={classNames(
        'absolute left-1/2 -top-[24px] -translate-x-1/2  bg-main-gray-300 rounded-[10px] z-10 p-6 pb-10',
        { hidden: previewMode === 'lg' }
      )}
      style={{ width: 'calc(100% + 48px)', height: 'calc(100% + 64px)' }}
    >
      <div className="bg-white w-full h-full"></div>
    </div>
  )
}

export default BackDevice
