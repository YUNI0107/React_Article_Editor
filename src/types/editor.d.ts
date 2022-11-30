import { CSSProperties } from 'react'
import { groupTypeEnum } from '../constants/enums/editorEnums'
import { ClickEventType } from './control'

type groupTypes =
  | groupTypeEnum.banner
  | groupTypeEnum.paragraph
  | groupTypeEnum.images
  | groupTypeEnum.gallery
  | groupTypeEnum.button

// banner
type bannerType = 'banner'

// paragraph
type paragraphType = 'paragraph'

// images
type imagesType =
  | 'triplicate-square'
  | 'triplicate-circle'
  | 'triplicate-rectangle'
  | 'double-square'
  | 'double-circle'
  | 'double-rectangle'

// gallery
type galleryType = 'nine-square' | 'fence' | 'carousel' | 'irregular'

type buttonType = 'button'
type textShowChecksType = 'title' | 'description'

// controlProps
export interface IControlProps extends CSSProperties {
  // TODO: [key: string]
  [key: string]: IControlProps[keyof IControlProps]
  imgPath?: string
  linkUrl?: string
  eventKey?: string
  clickEvent?: ClickEventType
  textShowChecks?: { [key in textShowChecksType]: boolean }
  title?: string
  description?: string
}

export type IControlPropsKey = keyof IControlProps

// controls
export type IControls =
  | 'imgPathControl'
  | 'imgFilterControl'
  | 'clickEventControl'
  | 'textShowControl'

/**
 *
 * Set a schema for each components
 * 1. include: groupTypes, type, controlProps ,controls(Only for editor mode)
 * 2. 每個props對應到一個controls
 */

type ISingleSchema = IBanner | IGallery | IButton | IParagraph
type IMultipleSchema = IImages
type IComponentSchema = ISingleSchema | IMultipleSchema
type SingleControlSchemaType = IParagraph | IBanner | IGallery | IButton | IImage

interface IBanner {
  uuid: string
  groupType: groupTypeEnum.banner
  type: bannerType
  props?: IControlProps
}
interface IParagraph {
  uuid: string
  groupType: groupTypeEnum.paragraph
  type: paragraphType
  props?: IControlProps
}
interface IImages {
  uuid: string
  groupType: groupTypeEnum.images
  type: imagesType
  children: Array<IImage>
}

interface IImage {
  uuid: string
  props?: IControlProps
  groupType: groupTypeEnum.images | groupTypeEnum.gallery | groupTypeEnum.banner
  childrenParagraph?: {
    title: IParagraph
    description: IParagraph
  }
}

interface IGallery {
  uuid: string
  groupType: groupTypeEnum.gallery
  type: galleryType
  props?: IControlProps
  childrenParagraph?: Array<{
    title: IParagraph
    description: IParagraph
  }>
}

interface IButton {
  uuid: string
  groupType: groupTypeEnum.button
  type: buttonType
  props?: IControlProps
  innerParagraph?: IParagraph
}
