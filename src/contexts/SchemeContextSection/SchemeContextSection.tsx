import { ReactNode, createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// constants
import { groupTypeEnum } from '../../constants/enums/editorEnums'

// types
import { IComponentSchema, IBanner } from '../../types/editor'

const uuid1 = uuidv4()
const uuid2 = uuidv4()
const uuid3 = uuidv4()

const a: IBanner = {
  uuid: uuid1,
  groupType: groupTypeEnum.banner,
  type: 'banner',
  props: {
    imgPath: 'https://miro.medium.com/max/1400/1*nUwBNo9xbZ1Yn7hAqd9oXg.png',
  },
  controls: ['imgFilterControl', 'clickEventControl'],
}
const b: IBanner = {
  uuid: uuid2,
  groupType: groupTypeEnum.banner,
  type: 'banner',
  props: {
    imgPath: 'https://miro.medium.com/max/1400/1*nUwBNo9xbZ1Yn7hAqd9oXg.png',
  },
  controls: ['imgFilterControl', 'clickEventControl'],
}
const c: IBanner = {
  uuid: uuid3,
  groupType: groupTypeEnum.banner,
  type: 'banner',
  props: {
    imgPath: 'https://miro.medium.com/max/1400/1*nUwBNo9xbZ1Yn7hAqd9oXg.png',
  },
  controls: ['imgFilterControl', 'clickEventControl'],
}

const defaultSchemes: {
  schemes: Array<IComponentSchema>
  handleScheme: (newSchemes: Array<IComponentSchema>) => void
} = {
  schemes: [],
  handleScheme: (newSchemes: Array<IComponentSchema>) => {
    console.log(newSchemes)
  },
}
export const SchemeContext = createContext(defaultSchemes)

function SchemeContextSection({ children }: { children: ReactNode }) {
  const [schemes, setSchemes] = useState<Array<IComponentSchema>>([a, b, c])

  return (
    <SchemeContext.Provider
      value={{
        schemes,
        handleScheme: (newSchemes: Array<IComponentSchema>) => setSchemes([...newSchemes]),
      }}
    >
      {children}
    </SchemeContext.Provider>
  )
}

export default SchemeContextSection
