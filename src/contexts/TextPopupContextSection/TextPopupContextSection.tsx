import { createContext, ReactNode, useState } from 'react'

// types
import { IStyleSelected, NeedUpdateType } from '../../types/control'

const defaultSchemas: {
  needUpdate: NeedUpdateType
  setNeedUpdate: (value: NeedUpdateType) => void
  fontSize: number
  setFontSize: (value: number) => void
  styleSelected: IStyleSelected
  setStyleSelected: (value: IStyleSelected) => void
  linHeight: number | null
  setLinHeight: (value: number | null) => void
  link: string | null
  setLink: (value: string | null) => void
  focusTextEditorId: string | null
  setFocusTextEditorId: (value: string | null) => void
} = {
  needUpdate: null,
  setNeedUpdate: (value) => console.log(value),
  fontSize: 0,
  setFontSize: (value) => console.log(value),
  styleSelected: {
    bold: false,
    italic: false,
    underline: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    listOrdered: false,
    listUnOrdered: false,
  },
  setStyleSelected: (value) => console.log(value),
  linHeight: null,
  setLinHeight: (value) => console.log(value),
  link: null,
  setLink: (value) => console.log(value),
  focusTextEditorId: null,
  setFocusTextEditorId: (value) => console.log(value),
}

export const TextPopupContext = createContext(defaultSchemas)

function TextPopupContextSection({ children }: { children: ReactNode }) {
  const [needUpdate, setNeedUpdate] = useState<NeedUpdateType>(null)
  const [fontSize, setFontSize] = useState(0)
  const [styleSelected, setStyleSelected] = useState<IStyleSelected>(defaultSchemas.styleSelected)
  const [linHeight, setLinHeight] = useState<number | null>(null)
  const [link, setLink] = useState<string | null>(null)
  const [focusTextEditorId, setFocusTextEditorId] = useState<string | null>(null)

  return (
    <TextPopupContext.Provider
      value={{
        needUpdate,
        setNeedUpdate,
        fontSize,
        setFontSize,
        styleSelected,
        setStyleSelected,
        linHeight,
        setLinHeight,
        link,
        setLink,
        focusTextEditorId,
        setFocusTextEditorId,
      }}
    >
      {children}
    </TextPopupContext.Provider>
  )
}

export default TextPopupContextSection
