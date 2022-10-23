import { PreviewModes } from '../constants/enums/otherEnums'

export type PreviewModesType = `${PreviewModes}`

export type DrawerStateType = 'add' | 'info'

export interface PopupDragItem {
  type: string
  top: number
  left: number
}

export interface SchemaDragItem {
  index: number
  id: string
  type: string
}
