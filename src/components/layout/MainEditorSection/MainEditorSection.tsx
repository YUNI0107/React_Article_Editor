// types
import { PreviewModesType } from '../../../types/layout.d'

function MainEditorSection({
  previewMode,
  handlePreviewMode,
}: {
  previewMode: PreviewModesType
  handlePreviewMode: (mode: PreviewModesType) => void
}) {
  console.log(previewMode, handlePreviewMode)

  return <></>
}

export default MainEditorSection
