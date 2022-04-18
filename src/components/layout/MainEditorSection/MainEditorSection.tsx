import classNames from 'classnames'

// components
import Ruler from './components/Ruler'
import Drawer from './components/Drawer'

// types
import SchemeContextSection from '../../../contexts/SchemeContextSection'
import { PreviewModesType } from '../../../types/layout.d'
import EditorSection from '../EditorSection'
import BackDevice from './components/BackDevice'

function MainEditorSection({
  previewMode,
  handlePreviewMode,
}: {
  previewMode: PreviewModesType
  handlePreviewMode: (mode: PreviewModesType) => void
}) {
  console.log(previewMode, handlePreviewMode)

  return (
    <div className="flex-1 flex h-full pt-20">
      {/* left-drawer */}
      <Drawer />

      {/* main-editor-section */}
      <div className="relative flex-1 flex flex-col items-center">
        {/* top-ruler */}
        <Ruler previewMode={previewMode} handlePreviewMode={handlePreviewMode} />
        {/* bottom-preview */}
        <SchemeContextSection>
          <div
            className={classNames(
              'h-full border-x-[2px] border-dashed border-main-gray-300 transition-all duration-700 flex flex-col justify-center',
              {
                'w-mobile': previewMode === 'sm',
                'w-tablet': previewMode === 'md',
                'w-desktop': previewMode === 'lg',
              }
            )}
          >
            <div
              className={classNames('relative', {
                'h-mobile': previewMode === 'sm',
                'h-tablet': previewMode === 'md',
                'h-full': previewMode === 'lg',
              })}
            >
              <div
                className={classNames(
                  'relative h-full w-full bg-white z-20 overflow-x-hidden overflow-y-auto',
                  {
                    'px-4': previewMode === 'md' || previewMode === 'sm',
                    'px-6': previewMode === 'lg',
                  }
                )}
              >
                <EditorSection />
              </div>

              <BackDevice previewMode={previewMode} />
            </div>
          </div>
        </SchemeContextSection>
      </div>
    </div>
  )
}

export default MainEditorSection
