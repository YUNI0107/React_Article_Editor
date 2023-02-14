import { groupTypes, IControls } from '../../types/editor'

export enum PreviewModes {
  Desktop = 'lg',
  Tablet = 'md',
  Mobile = 'sm',
}

export enum ModeSizes {
  Desktop = 1026,
  Tablet = 720,
  Mobile = 320,
}

export const containerWidth = 240

export const CONTROLLER_MAP: { [key in groupTypes]: Array<IControls> } = {
  banner: ['imgFilterControl', 'clickEventControl', 'textShowControl'],
  paragraph: [],
  images: [],
  gallery: [],
  button: ['backGroundControl'],
}
