import { useContext, useMemo } from 'react'
import classNames from 'classnames'

// types
import { PreviewModesType } from '../../../types/layout'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

// styles
const ruler =
  'h-7 border-x border-white flex justify-center items-center absolute left-1/2 -translate-x-1/2 cursor-pointer hover:brightness-110 active:contrast-125'

function Ruler() {
  const { previewMode, handlePreviewMode, setIsPopupShow } = useContext(EditorInfoContext)

  const previewModeText = useMemo(() => {
    switch (previewMode) {
      case 'sm':
        return 'Mobile'
      case 'md':
        return 'Tablet'
      case 'lg':
        return 'Desktop'
      default:
        return 'Desktop'
    }
  }, [previewMode])

  const modes: Array<PreviewModesType> = ['sm', 'md', 'lg']

  const clickPreviewMode = (mode: PreviewModesType) => {
    handlePreviewMode(mode)
    setIsPopupShow(false)
  }

  return (
    <div className="fixed z-40 top-[52px] h-7">
      {modes.map((mode) => {
        return (
          <div
            key={mode}
            onClick={() => clickPreviewMode(mode)}
            className={classNames(
              ruler,
              {
                'w-mobile z-30': mode === 'sm',
                'w-tablet z-20': mode === 'md',
                'w-desktop z-10': mode === 'lg',
              },
              {
                'bg-secondary-blue-200': mode === 'lg' && previewMode === 'sm',
                'bg-secondary-blue-300':
                  (mode === 'lg' && previewMode === 'md') ||
                  (mode === 'md' && previewMode === 'sm'),
                'bg-main-blue':
                  mode === 'sm' ||
                  (mode === 'lg' && previewMode === 'lg') ||
                  (mode === 'md' && previewMode === 'md'),
              }
            )}
          >
            {mode === 'sm' && <h4 className="text-white font-semibold">{previewModeText}</h4>}
          </div>
        )
      })}
    </div>
  )
}

export default Ruler
