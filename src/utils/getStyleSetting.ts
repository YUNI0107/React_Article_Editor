// types
import { PreviewModesType } from '../types/layout'

export interface IStyleMapList {
  general?: string
  publish?: string
  editor?: {
    sm?: string
    md?: string
    lg?: string
  }
}

const getStyleSetting = (
  schemaStyleMapList: IStyleMapList,
  previewMode: PreviewModesType,
  isEditorMode: boolean
) => {
  const arrangedClassNames = []

  if (schemaStyleMapList.general) {
    arrangedClassNames.push(schemaStyleMapList.general)
  }

  if (isEditorMode && schemaStyleMapList.editor) {
    if (schemaStyleMapList.editor) {
      arrangedClassNames.push(schemaStyleMapList.editor[previewMode])
    }
  } else {
    arrangedClassNames.push(schemaStyleMapList.general)
  }

  return arrangedClassNames.toString().replaceAll(',', ' ')
}

export default getStyleSetting
