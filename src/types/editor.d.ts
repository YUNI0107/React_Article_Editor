import { CSSProperties } from 'react'

type groupType = 'paragraph' | 'images' | 'gallery' | 'button'

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
  imgPaths?: Array<string>
}

// controls
export type IControls = 'imgPathControl'

/**
 *
 * Set a schema for each components
 * 1. include: groupType, type, controlProps ,controls(Only for editor mode)
 * 2. 每個controlProps對應到一個controls
 */

type IComponentSchema = IParagraph | IImages | IGallery | IButton

interface IParagraph {
  groupType: 'paragraph'
  type: paragraphType
  props?: IControlProps
  controls?: Array<IControls>
}
interface IImages {
  groupType: 'images'
  type: imagesType
  props?: IControlProps
  controls?: Array<IControls>
  childrenParagraph?: Array<{
    title: IParagraph
    description: IParagraph
  }>
}
interface IGallery {
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
  groupType: 'button'
  type: buttonType
  props?: IControlProps
  controls?: Array<IControls>
  innerParagraph?: IParagraph
}
