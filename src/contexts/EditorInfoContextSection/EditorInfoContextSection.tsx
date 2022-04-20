import { createContext, ReactNode, useState } from 'react'

// types
import { PreviewModesType } from '../../types/layout'

// utils
import getElementPosition from '../../utils/getElementPosition'

const defaultInformation: {
  previewMode: PreviewModesType
  handlePreviewMode: (mode: PreviewModesType) => void
  distance: { top: number; left: number }
  countPopupDistance: (element: HTMLElement) => void
} = {
  previewMode: 'lg',
  handlePreviewMode: (mode: PreviewModesType) => {
    console.log(mode)
  },
  distance: { left: 0, top: 0 },
  countPopupDistance: (element) => {
    console.log(element)
  },
}

export const EditorInfoContext = createContext(defaultInformation)

function EditorInfoContextSection({ children }: { children: ReactNode }) {
  const [previewMode, setPreviewMode] = useState<PreviewModesType>('lg')
  const [distance, setDistance] = useState({ top: -100, left: -100 })

  // operations
  const handlePreviewMode = (mode: PreviewModesType) => {
    setPreviewMode(mode)
  }

  const countPopupDistance = (element: HTMLElement) => {
    const { left, top } = getElementPosition(element || null)

    setDistance({
      top: top + 100,
      left: left + 100,
    })
  }

  return (
    <EditorInfoContext.Provider
      value={{
        previewMode: previewMode,
        handlePreviewMode: handlePreviewMode,
        distance: distance,
        countPopupDistance: countPopupDistance,
      }}
    >
      {children}
    </EditorInfoContext.Provider>
  )
}

export default EditorInfoContextSection
