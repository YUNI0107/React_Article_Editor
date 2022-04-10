import classNames from 'classnames'

// types
import { PreviewModesType } from '../../../../../types/layout'

function BackDevice({ previewMode }: { previewMode: PreviewModesType }) {
  return (
    <div
      className={classNames(
        'absolute left-1/2 -top-[24px] -translate-x-1/2  bg-main-gray-300 rounded-[10px] z-10',
        { hidden: previewMode === 'lg' }
      )}
      style={{ width: 'calc(100% + 48px)', height: 'calc(100% + 64px)' }}
    ></div>
  )
}

export default BackDevice
