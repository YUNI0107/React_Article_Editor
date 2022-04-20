import { createContext, ReactNode, useState } from 'react'

// types
import { PreviewModesType } from '../../types/layout'

const defaultInformation: {
  previewMode: PreviewModesType
  handlePreviewMode: (mode: PreviewModesType) => void
} = {
  previewMode: 'lg',
  handlePreviewMode: (mode: PreviewModesType) => {
    console.log(mode)
  },
}

export const EditorInfoContext = createContext(defaultInformation)

function EditorInfoContextSection({ children }: { children: ReactNode }) {
  const [previewMode, setPreviewMode] = useState<PreviewModesType>('lg')

  // operations
  const handlePreviewMode = (mode: PreviewModesType) => {
    setPreviewMode(mode)
  }

  return (
    <EditorInfoContext.Provider
      value={{
        previewMode: previewMode,
        handlePreviewMode: handlePreviewMode,
      }}
    >
      {children}
    </EditorInfoContext.Provider>
  )
}

export default EditorInfoContextSection
