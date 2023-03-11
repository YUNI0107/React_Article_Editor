// default images
import DefaultImage1 from '../assets/default/default_1.jpg'
import DefaultIconHouse from '../assets/icon/house.png'
import DefaultIconChart from '../assets/icon/chart.png'

// default text content
import {
  titleJsonContent,
  paragraphJsonContent,
  buttonJsonContent,
} from './defaultTextEditorContent'

// types
import { IBanner, IButton } from '../types/editor'

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

// methods
export const getRandomDefaultButtonSchema = () => {
  if (defaultButtonSchema.props) {
    defaultButtonSchema.props.backgroundColor = getRandomColor()
    defaultButtonSchema.props.imgPath =
      Math.floor(Math.random() * 2) === 0 ? DefaultIconHouse : DefaultIconChart
  }

  return defaultButtonSchema
}
