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

// controlProps
interface IControlProps {
  borderRadius: string
}

/**
 *
 * Set a schema for each components
 * 1. include: groupType, type, props ,controls(Only for editor mode)
 * 2. 每個props對應到一個controls
 */

interface IComponentSchema {
  groupType: groupType
  type: paragraphType | imagesType
  props?: IControlProps
  control?: Array<ReactNode>
  childrenParagraph?: Array<IChildrenParagraph & IComponentSchema>
}

interface IChildrenParagraph {
  groupType: 'paragraph'
  type: paragraphType
}
