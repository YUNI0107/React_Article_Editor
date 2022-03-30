import classNames from 'classnames'

// components
import Ruler from './components/Ruler'
import Drawer from './components/Drawer'

// types
import SchemeContextSection from '../../../contexts/SchemeContextSection'
import { PreviewModesType } from '../../../types/layout.d'
import EditorSection from '../EditorSection'

function MainEditorSection({
  previewMode,
  handlePreviewMode,
}: {
  previewMode: PreviewModesType
  handlePreviewMode: (mode: PreviewModesType) => void
}) {
  console.log(previewMode, handlePreviewMode)

  return (
    <div className="flex">
      {/* left-drawer */}
      <Drawer />

      {/* main-editor-section */}
      <div className={classNames('flex-1 flex flex-col items-center')}>
        {/* top-ruler */}
        <Ruler previewMode={previewMode} handlePreviewMode={handlePreviewMode} />
        {/* bottom-preview */}
        <SchemeContextSection>
          <div
            className={classNames(
              'min-h-screen h-full bg-white border-x-[2px] border-dashed border-main-gray-300 transition-all duration-700',
              {
                'w-mobile': previewMode === 'sm',
                'w-tablet': previewMode === 'md',
                'w-desktop': previewMode === 'lg',
              }
            )}
          >
            <EditorSection />
          </div>
        </SchemeContextSection>
      </div>
    </div>
  )
}

export default MainEditorSection
