import { useState } from 'react'

// components
import Header from '../../components/layout/Header'
import MainEditorSection from '../../components/layout/MainEditorSection'

// types
import { PreviewModesType } from '../../types/layout.d'

function MainPage() {
  const [previewMode, setPreviewMode] = useState<PreviewModesType>('lg')

  // operations
  const handlePreviewMode = (mode: PreviewModesType) => {
    setPreviewMode(mode)
  }

  return (
    <div className="w-screen min-h-screen min-w-[1052px] bg-secondary-blue-100">
      <Header />
      <MainEditorSection previewMode={previewMode} handlePreviewMode={handlePreviewMode} />
    </div>
  )
}

export default MainPage

{
  /* <SchemeContextSection>
<EditorSection />
</SchemeContextSection> */
}
