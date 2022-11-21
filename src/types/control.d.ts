export type ClickEventType = 'image-popup' | 'link'
export type LineHeightType = 'auto' | 'custom'

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
