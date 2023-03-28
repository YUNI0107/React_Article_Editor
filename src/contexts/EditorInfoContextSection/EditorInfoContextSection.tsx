import { createContext, ReactNode, useEffect, useState } from 'react'

// types
import { PopupStateType, PreviewModesType } from '../../types/layout'
import { IComponentSchema } from '../../types/editor'

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
  focusElementSchema: IComponentSchema | null
  setFocusElementSchema: (schema: IComponentSchema | null) => void
  isPopupShow: boolean
  setIsPopupShow: (isShow: boolean) => void
  focusElementHeight: number
  setFocusElementHeight: (height: number) => void
  popupState: PopupStateType
  setPopupState: (type: PopupStateType) => void
  popupChildrenIndex: number | null
  setPopupChildrenIndex: (type: number | null) => void
  isModalShow: boolean
  setIsModalShow: (isShow: boolean) => void
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
  setFocusElementHeight: (height) => console.log(height),
  popupState: null,
  setPopupState: (type) => console.log(type),
  popupChildrenIndex: null,
  setPopupChildrenIndex: (index) => console.log(index),
  isModalShow: false,
  setIsModalShow: (isShow) => console.log(isShow),
}

export const EditorInfoContext = createContext(defaultInformation)

function EditorInfoContextSection({ children }: { children: ReactNode }) {
  const [previewMode, setPreviewMode] = useState<PreviewModesType>('lg')
  const [focusElementSchema, setFocusElementSchema] = useState<IComponentSchema | null>(null)
  const [focusElementHeight, setFocusElementHeight] = useState<number>(0)

  // Layout show
  const [isPopupShow, setIsPopupShow] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })
  const [popupState, setPopupState] = useState<PopupStateType>('schema')
  const [popupChildrenIndex, setPopupChildrenIndex] = useState<number | null>(null)
  const [isModalShow, setIsModalShow] = useState(false)

  const isEditorMode = true

  // operations
  const handlePreviewMode = (mode: PreviewModesType) => {
    setPreviewMode(mode)
  }

  const focusElementSchemaHandler = (schema: IComponentSchema | null) => {
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
        popupChildrenIndex,
        setPopupChildrenIndex,
        isModalShow,
        setIsModalShow,
      }}
    >
      {children}
    </EditorInfoContext.Provider>
  )
}

export default EditorInfoContextSection
