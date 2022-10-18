import classNames from 'classnames'
import { useContext } from 'react'

// contexts
import { EditorInfoContext } from '../../../../contexts/EditorInfoContextSection'

function BackDevice() {
  const { previewMode } = useContext(EditorInfoContext)

  return (
    <div
      className={classNames(
        'absolute left-1/2 -top-[24px] -translate-x-1/2  bg-main-gray-300 rounded-[10px] z-10 p-6 ',
        {
          hidden: previewMode === 'lg',
          // device height 691 - inside height 600 - back device top 24 = 67
          'pb-[67px]': previewMode === 'md',
          // device height 659 - inside height 580 - back device top 24 = 55
          'pb-[55px]': previewMode === 'sm',
        }
      )}
      style={{ width: 'calc(100% + 48px)', height: 'calc(100% + 64px)' }}
    >
      <div className="bg-white w-full h-full"></div>
    </div>
  )
}

export default BackDevice
