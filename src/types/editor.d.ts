import { ReactNode } from 'react'

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
interface IControlProps {
  [key: string]: string
}

/**
 *
 * Set a schema for each components
 * 1. include: groupType, type, props ,controls(Only for editor mode)
 * 2. 每個props對應到一個controls
 */

type IComponentSchema = IParagraph | IImages | IGallery | IButton

interface IParagraph {
  groupType: 'paragraph'
  type: paragraphType
  props?: IControlProps
  control?: Array<ReactNode>
}
interface IImages {
  groupType: 'images'
  type: imagesType
  props?: IControlProps
  control?: Array<ReactNode>
  childrenParagraph?: Array<{
    title: IParagraph
    description: IParagraph
  }>
}
interface IGallery {
  groupType: 'gallery'
  type: galleryType
  props?: IControlProps
  control?: Array<ReactNode>
  childrenParagraph?: Array<{
    title: IParagraph
    description: IParagraph
  }>
}

interface IButton {
  groupType: 'button'
  type: buttonType
  props?: IControlProps
  control?: Array<ReactNode>
  innerParagraph?: IParagraph
}
