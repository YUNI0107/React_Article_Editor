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
          // device height 670 - inside height 600 - back device top 24 = 46
          'pb-[46px]': previewMode === 'md',
          // device height 650 - inside height 576 - back device top 24 = 50
          'pb-[50px]': previewMode === 'sm',
        }
      )}
      style={{ width: 'calc(100% + 48px)', height: 'calc(100% + 70px)' }}
    >
      <div className="bg-white w-full h-full"></div>
    </div>
  )
}

export default BackDevice
