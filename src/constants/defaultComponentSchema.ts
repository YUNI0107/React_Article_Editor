// default images
import DefaultImage1 from '../assets/default/default_1.jpg'
import DefaultImage2 from '../assets/default/default_2.png'
import DefaultImage3 from '../assets/default/default_3.png'
import DefaultImage4 from '../assets/default/default_4.png'
import DefaultIconHouse from '../assets/icon/house.png'
import DefaultIconChart from '../assets/icon/chart.png'

// default text content
import {
  titleJsonContent,
  paragraphJsonContent,
  buttonJsonContent,
  paragraphComponentJsonContent,
} from './defaultTextEditorContent'

// types
import { IBanner, IButton, IImages, IImage, imagesType, IParagraph } from '../types/editor'

// constant
import { groupTypeEnum } from './enums/editorEnums'

// utils
import getRandomColor from '../utils/getRandomColor'

export const defaultBannerSchema: Omit<IBanner, 'uuid'> = {
  groupType: groupTypeEnum.banner,
  type: 'banner',
  props: {
    imgPath: DefaultImage1,
    clickEvent: 'image-popup',
    textShowChecks: {
      title: true,
      description: true,
    },
    title: titleJsonContent,
    description: paragraphJsonContent,
    filter: '',
  },
}

export const defaultButtonSchema: Omit<IButton, 'uuid'> = {
  groupType: groupTypeEnum.button,
  type: 'button',
  props: {
    innerParagraph: buttonJsonContent,
    backgroundColor: '#b900e2',
    borderColor: '#000',
    borderWidth: 2,
    roundedKey: 'custom',
    customRounded: {
      leftTop: 5,
      rightTop: 5,
      rightBottom: 5,
      leftBottom: 5,
    },
    padding: {
      x: 20,
      y: 5,
    },
    alignment: 'center',
    isLinkBlank: true,
    isIconShow: true,
    imgPath: DefaultIconHouse,
    display: 'left',
    scale: {
      width: 30,
      height: 30,
    },
    isInScale: true,
    buttonTextShowChecks: true,
  },
}

const defaultImagesSchema: Omit<IImages, 'uuid' | 'children'> & {
  children: Array<Omit<IImage, 'uuid' | 'children'>>
} = {
  groupType: groupTypeEnum.images,
  type: 'double-circle',
  props: {
    roundedKey: 'none',
    customRounded: {
      leftTop: 5,
      rightTop: 5,
      rightBottom: 5,
      leftBottom: 5,
    },
  },
  children: [],
}

const defaultImage: Omit<IImage, 'uuid'> = {
  groupType: groupTypeEnum.image,
  props: {
    imgPath: DefaultImage2,
    clickEvent: 'image-popup',
    textShowChecks: {
      title: true,
      description: true,
    },
    title: titleJsonContent,
    description: paragraphJsonContent,
    filter: '',
  },
}

export const defaultParagraph: Omit<IParagraph, 'uuid'> = {
  groupType: groupTypeEnum.paragraph,
  type: 'paragraph',
  props: {
    content: paragraphComponentJsonContent,
  },
}

// methods
export const getRandomDefaultButtonSchema = () => {
  if (defaultButtonSchema.props) {
    defaultButtonSchema.props.backgroundColor = getRandomColor()
    defaultButtonSchema.props.imgPath =
      Math.floor(Math.random() * 2) === 0 ? DefaultIconHouse : DefaultIconChart
  }

  return defaultButtonSchema
}

const defaultImages = [DefaultImage2, DefaultImage3, DefaultImage4]
export const getRandomImagesSchema = (type: imagesType) => {
  const [number, shape] = type.split('-')

  defaultImagesSchema.type = type

  if (defaultImagesSchema.props) {
    defaultImagesSchema.props.roundedKey = shape === 'circle' ? 'circle' : 'none'
  }
  const num = number === 'triplicate' ? 3 : 2
  defaultImagesSchema.children = []

  for (let i = 0; i < num; i++) {
    const image = structuredClone(defaultImage)

    if (image.props) {
      image.props.imgPath = defaultImages[i]
    }
    defaultImagesSchema.children.push(image)
  }

  return defaultImagesSchema
}
