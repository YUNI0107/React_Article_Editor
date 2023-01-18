import { createContext, ReactNode, useEffect, useState } from 'react'

// types
import { PopupStateType, PreviewModesType } from '../../types/layout'
import { IComponentSchema, SingleControlSchemaType } from '../../types/editor'

export interface IDistance {
  top: number
  left: number
}

const defaultInformation: {
  isEditorMode: boolean
  previewMode: PreviewModesType
  handlePreviewMode: (mode: PreviewModesType) => void
  popupPosition: IDistance
  setPopupPosition: (distance: IDistance) => void
  focusElementSchema: SingleControlSchemaType | null
  setFocusElementSchema: (schema: IComponentSchema | null) => void
  isPopupShow: boolean
  setIsPopupShow: (isShow: boolean) => void
  focusElementHeight: number
  setFocusElementHeight: (height: number) => void
  popupState: PopupStateType
  setPopupState: (type: PopupStateType) => void
} = {
  isEditorMode: true,
  previewMode: 'lg',
  handlePreviewMode: (mode) => console.log(mode),
  popupPosition: { left: 0, top: 0 },
  setPopupPosition: (position) => console.log(position),
  focusElementSchema: null,
  setFocusElementSchema: (schema) => console.log(schema),
  isPopupShow: false,
  setIsPopupShow: (isShow) => console.log(isShow),
  focusElementHeight: 0,
  setFocusElementHeight: (height) => {
    console.log(height)
  },
  popupState: null,
  setPopupState: (type) => {
    console.log(type)
  },
}

export const EditorInfoContext = createContext(defaultInformation)

function EditorInfoContextSection({ children }: { children: ReactNode }) {
  const [previewMode, setPreviewMode] = useState<PreviewModesType>('lg')
  const [focusElementSchema, setFocusElementSchema] = useState<SingleControlSchemaType | null>(null)
  const [focusElementHeight, setFocusElementHeight] = useState<number>(0)

  // Layout show
  const [isPopupShow, setIsPopupShow] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })
  const [popupState, setPopupState] = useState<PopupStateType>('schema')

  const isEditorMode = true

  // operations
  const handlePreviewMode = (mode: PreviewModesType) => {
    setPreviewMode(mode)
  }

  const focusElementSchemaHandler = (schema: IComponentSchema | null) => {
    if (schema?.groupType === 'images') return null
    setFocusElementSchema(schema)
  }

  // effects
  useEffect(() => {
    if (!isPopupShow) {
      setPopupState(null)
    }
  }, [isPopupShow])

  return (
    <EditorInfoContext.Provider
      value={{
        isEditorMode,
        previewMode,
        handlePreviewMode,
        popupPosition,
        setPopupPosition,
        focusElementSchema: focusElementSchema,
        setFocusElementSchema: focusElementSchemaHandler,
        isPopupShow,
        setIsPopupShow,
        focusElementHeight,
        setFocusElementHeight,
        popupState,
        setPopupState,
      }}
    >
      {children}
    </EditorInfoContext.Provider>
  )
}

export default EditorInfoContextSection
