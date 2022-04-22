import { CSSProperties } from 'react'

type groupType = 'banner' | 'paragraph' | 'images' | 'gallery' | 'button'

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

// controlProps
export interface IControlProps extends CSSProperties {
  // TODO: [key: string]
  [key: string]: string | number
  imgPath?: string
}

export type IControlPropsKey = keyof IControlProps

// controls
export type IControls = 'imgPathControl' | 'imgFilterControl'

/**
 *
 * Set a schema for each components
 * 1. include: groupType, type, controlProps ,controls(Only for editor mode)
 * 2. 每個props對應到一個controls
 */

type IComponentSchema = IParagraph | IBanner | IImages | IGallery | IButton
type ISingleSchema = IBanner | IGallery | IButton
type IMultipleSchema = IImages

interface IBanner {
  uuid: string
  groupType: 'banner'
  type: bannerType
  props?: IControlProps
  controls?: Array<IControls>
}
interface IParagraph {
  uuid: string
  groupType: 'paragraph'
  type: paragraphType
  props?: IControlProps
  controls?: Array<IControls>
}
interface IImages {
  uuid: string
  groupType: 'images'
  type: imagesType
  children: Array<IImage>
}

interface IImage {
  uuid: string
  props?: IControlProps
  controls?: Array<IControls>
  childrenParagraph?: {
    title: IParagraph
    description: IParagraph
  }
}

interface IGallery {
  uuid: string
  groupType: 'gallery'
  type: galleryType
  props?: IControlProps
  controls?: Array<IControls>
  childrenParagraph?: Array<{
    title: IParagraph
    description: IParagraph
  }>
}

interface IButton {
  uuid: string
  groupType: 'button'
  type: buttonType
  props?: IControlProps
  controls?: Array<IControls>
  innerParagraph?: IParagraph
}
