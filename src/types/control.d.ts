export type ClickEventType = 'image-popup' | 'link'
export type LineHeightType = 'auto' | 'custom'
export type RoundedType = 'none' | 'circle' | 'custom'
export type GalleryDescriptionType = 'description' | 'none'
export type RoundedCustomInputType = {
  leftTop: number
  rightTop: number
  rightBottom: number
  leftBottom: number
}
export type PaddingType = {
  x: number
  y: number
}
export type AlignmentType = 'left' | 'center' | 'right'
export type DisplayType = 'left' | 'right' | 'top' | 'bottom'
export type ScaleType = {
  width: number
  height: number
}

export type ChangeValueFuncType = (
  controlName: string,
  value: IControlProps[keyof IControlProps],
  uuid: string,
  childUuid?: string | undefined
) => void

export type GetValueFuncType = (
  controlName: string,
  uuid: string,
  childUuid?: string | undefined
) => IControlProps[keyof IControlProps]

export interface IStyleSelected {
  bold: boolean
  italic: boolean
  underline: boolean
  alignLeft: boolean
  alignCenter: boolean
  alignRight: boolean
  listOrdered: boolean
  listUnOrdered: boolean
}

type NeedUpdateSelectedType = {
  [key in keyof IStyleSelected]: number | string | boolean
}

type NeedUpdateOtherType = {
  fontSize: number
  lineHeight: number | null
  link: string | null
  fontColor: string
  reset: boolean
}

type NeedUpdateType = Partial<NeedUpdateSelectedType & NeedUpdateOtherType> | null
