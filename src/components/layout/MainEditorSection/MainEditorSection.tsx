import classNames from 'classnames'

// types
import SchemeContextSection from '../../../contexts/SchemeContextSection'
import { PreviewModesType } from '../../../types/layout.d'
import EditorSection from '../EditorSection'

// styles
const editorContainerStyle = (mode: PreviewModesType) => {
  const lgSize = 'w-desktop'
  const mdSize = 'w-tablet'
  const smSize = 'w-mobile'
  const size = mode === 'lg' ? lgSize : mode === 'md' ? mdSize : smSize
  return size
}

function MainEditorSection({
  previewMode,
  handlePreviewMode,
}: {
  previewMode: PreviewModesType
  handlePreviewMode: (mode: PreviewModesType) => void
}) {
  console.log(previewMode, handlePreviewMode)

  return (
    <div>
      {/* left-drawer */}
      <div className={classNames(editorContainerStyle(previewMode))}></div>

      {/* main-editor-section */}
      <div>
        {/* top-ruler */}
        <div></div>
        {/* bottom-preview */}
        <SchemeContextSection>
          <div>
            <EditorSection />
          </div>
        </SchemeContextSection>
      </div>
    </div>
  )
}

export default MainEditorSection
