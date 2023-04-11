import { v4 as uuidv4 } from 'uuid'

// default images
import DefaultImage1 from '../assets/default/default_1.jpg'
import DefaultImage2 from '../assets/default/default_2.png'
import DefaultImage3 from '../assets/default/default_3.png'
import DefaultImage4 from '../assets/default/default_4.png'
import DefaultImage5 from '../assets/default/default_5.png'
import DefaultImage6 from '../assets/default/default_6.png'
import DefaultImage7 from '../assets/default/default_7.png'
import DefaultImage8 from '../assets/default/default_8.png'
import DefaultImage9 from '../assets/default/default_9.png'
import DefaultImage10 from '../assets/default/default_10.png'
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
import {
  IBanner,
  IButton,
  IImages,
  IImage,
  imagesType,
  IParagraph,
  galleryType,
  IGallery,
  IGalleryImage,
} from '../types/editor'

// constant
import { groupTypeEnum } from './enums/editorEnums'

// utils
import getRandomColor from '../utils/getRandomColor'
import { galleryTypeList } from './gallery'

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

const defaultGallerySchema: Omit<IGallery, 'uuid'> = {
  groupType: groupTypeEnum.gallery,
  type: 'nine-square',
  props: {
    images: [],
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

const defaultImages = [
  DefaultImage2,
  DefaultImage3,
  DefaultImage4,
  DefaultImage5,
  DefaultImage6,
  DefaultImage7,
  DefaultImage8,
  DefaultImage9,
  DefaultImage10,
]

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

export const getRandomGallerySchema = (type: galleryType) => {
  const num = galleryTypeList[type].amount
  defaultGallerySchema.type = type

  const referenceDefaultImages = [...defaultImages].reverse()
  const images: Array<IGalleryImage> = []
  for (let i = 0; i < num; i++) {
    images.push({
      id: uuidv4(),
      imgPath: referenceDefaultImages[i] || referenceDefaultImages[0],
      description: '',
    })
  }

  if (defaultGallerySchema.props) {
    defaultGallerySchema.props.images = images
  }

  return defaultGallerySchema
}
