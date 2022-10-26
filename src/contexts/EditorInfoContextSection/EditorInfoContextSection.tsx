import { createContext, ReactNode, useState } from 'react'

// types
import { PreviewModesType } from '../../types/layout'
import { IComponentSchema, SingleControlSchemaType } from '../../types/editor'

interface IDistance {
  top: number
  left: number
}

const defaultInformation: {
  previewMode: PreviewModesType
  handlePreviewMode: (mode: PreviewModesType) => void
  distance: { top: number; left: number }
  focusElementSchema: SingleControlSchemaType | null
  setFocusElementSchema: (schema: IComponentSchema | null) => void
  setElementPosition: (distance: IDistance) => void
  isPopupShow: boolean
  setIsPopupShow: (isShow: boolean) => void
  focusElementHeight: number
  setFocusElementHeight: (height: number) => void
} = {
  previewMode: 'lg',
  handlePreviewMode: (mode: PreviewModesType) => console.log(mode),
  distance: { left: 0, top: 0 },
  focusElementSchema: null,
  setFocusElementSchema: (schema) => console.log(schema),
  setElementPosition: (position) => console.log(position),
  isPopupShow: false,
  setIsPopupShow: (isShow) => console.log(isShow),
  focusElementHeight: 0,
  setFocusElementHeight: (height: number) => {
    console.log(height)
  },
}

export const EditorInfoContext = createContext(defaultInformation)

function EditorInfoContextSection({ children }: { children: ReactNode }) {
  const [previewMode, setPreviewMode] = useState<PreviewModesType>('lg')
  const [elementPosition, setElementPosition] = useState({ top: -100, left: -100 })
  const [focusElementSchema, setFocusElementSchema] = useState<SingleControlSchemaType | null>(null)
  const [isPopupShow, setIsPopupShow] = useState(false)
  const [focusElementHeight, setFocusElementHeight] = useState<number>(0)

  // operations
  const handlePreviewMode = (mode: PreviewModesType) => {
    setPreviewMode(mode)
  }

  const focusElementSchemaHandler = (schema: IComponentSchema | null) => {
    if (schema?.groupType === 'images') return null

    setFocusElementSchema(schema)
  }

  return (
    <EditorInfoContext.Provider
      value={{
        previewMode,
        handlePreviewMode,
        distance: elementPosition,
        focusElementSchema: focusElementSchema,
        setFocusElementSchema: focusElementSchemaHandler,
        setElementPosition,
        isPopupShow,
        setIsPopupShow,
        focusElementHeight,
        setFocusElementHeight,
      }}
    >
      {children}
    </EditorInfoContext.Provider>
  )
}

export default EditorInfoContextSection
