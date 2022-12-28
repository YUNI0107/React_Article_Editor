import { createContext, ReactNode, useState } from 'react'

// types
import { IStyleSelected, NeedUpdateType, LineHeightType } from '../../types/control'

const defaultSchemas: {
  needUpdate: NeedUpdateType
  setNeedUpdate: (value: NeedUpdateType) => void
  fontSize: number
  setFontSize: (value: number) => void
  styleSelected: IStyleSelected
  setStyleSelected: (value: IStyleSelected) => void
  lineHeightType: LineHeightType
  setLineHeightType: (value: LineHeightType) => void
  lineHeight: number
  setLineHeight: (value: number) => void
  link: string | null
  setLink: (value: string | null) => void
  focusTextEditor: Element | null
  setFocusTextEditor: (value: Element | null) => void
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
  lineHeightType: 'auto',
  setLineHeightType: (value) => console.log(value),
  lineHeight: 0,
  setLineHeight: (value) => console.log(value),
  link: null,
  setLink: (value) => console.log(value),
  focusTextEditor: null,
  setFocusTextEditor: (value) => console.log(value),
}

export const TextPopupContext = createContext(defaultSchemas)

function TextPopupContextSection({ children }: { children: ReactNode }) {
  const [needUpdate, setNeedUpdate] = useState<NeedUpdateType>(null)
  const [fontSize, setFontSize] = useState(0)
  const [styleSelected, setStyleSelected] = useState<IStyleSelected>(defaultSchemas.styleSelected)
  const [lineHeightType, setLineHeightType] = useState<LineHeightType>('auto')
  const [lineHeight, setLineHeight] = useState<number>(0)
  const [link, setLink] = useState<string | null>(null)
  const [focusTextEditor, setFocusTextEditor] = useState<Element | null>(null)

  return (
    <TextPopupContext.Provider
      value={{
        needUpdate,
        setNeedUpdate,
        fontSize,
        setFontSize,
        styleSelected,
        setStyleSelected,
        lineHeightType,
        setLineHeightType,
        lineHeight,
        setLineHeight,
        link,
        setLink,
        focusTextEditor,
        setFocusTextEditor,
      }}
    >
      {children}
    </TextPopupContext.Provider>
  )
}

export default TextPopupContextSection
