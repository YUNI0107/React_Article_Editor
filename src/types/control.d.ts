export type ClickEventType = 'image-popup' | 'link'
export type ChangeValueFuncType = (
  controlName: string,
  value: string,
  uuid: string,
  childUuid?: string | undefined
) => void
export type GetValueFuncType = (
  controlName: string,
  uuid: string,
  childUuid?: string | undefined
) => string | number | undefined
