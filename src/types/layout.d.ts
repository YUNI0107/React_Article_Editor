import { PreviewModes } from '../constants/enums/otherEnums'

export type PreviewModesType = `${PreviewModes}`

export type DrawerStateType = 'add' | 'info'

export interface IPopupDragItem {
  type: string
  top: number
  left: number
}

export interface ISchemaDragItem {
  index: number
  id: string
  type: string
}

export interface IUseScroll {
  position: number
  isScrollAllowed: boolean
}

export interface IDropDownListItem {
  value: string | number
  info: text | ReactNode
}
