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
  addScheme: (newScheme: IComponentSchema) => void
  moveScheme: (schemeUuid: string, direction: 'up' | 'down') => void
  deleteScheme: (schemeUuid: string) => void
} = {
  schemes: [],
  handleScheme: (newSchemes: Array<IComponentSchema>) => {
    console.log(newSchemes)
  },
  addScheme: (newScheme: IComponentSchema) => {
    console.log(newScheme)
  },
  moveScheme: (schemeUuid: string, direction: 'up' | 'down') => {
    console.log(schemeUuid, direction)
  },
  deleteScheme: (schemeUuid: string) => {
    console.log(schemeUuid)
  },
}

export const SchemeContext = createContext(defaultSchemes)

function SchemeContextSection({ children }: { children: ReactNode }) {
  const [schemes, setSchemes] = useState<Array<IComponentSchema>>([a, b, c])

  const addScheme = (newScheme: IComponentSchema) => {
    setSchemes((prevScheme) => [...prevScheme, newScheme])
  }

  const moveScheme = (schemeUuid: string, direction: 'up' | 'down') => {
    const targetIndex = schemes.findIndex((scheme) => scheme.uuid === schemeUuid)

    if (
      (targetIndex === 0 && direction === 'up') ||
      (targetIndex === schemes.length - 1 && direction === 'down')
    ) {
      // Check: If the scheme is at the limit, can't move it
      return
    }

    const newIndex = direction === 'up' ? targetIndex - 1 : targetIndex + 1
    exchangeScheme(targetIndex, newIndex)
  }

  const exchangeScheme = (originalIndex: number, newIndex: number) => {
    setSchemes((prevScheme) => {
      const arrangeSchemes = [...prevScheme]
      ;[arrangeSchemes[originalIndex], arrangeSchemes[newIndex]] = [
        arrangeSchemes[newIndex],
        arrangeSchemes[originalIndex],
      ]
      return arrangeSchemes
    })
  }

  const deleteScheme = (schemeUuid: string) => {
    setSchemes((prevScheme) => {
      const arrangeSchemes = prevScheme.filter((scheme) => scheme.uuid !== schemeUuid)
      return arrangeSchemes
    })
  }

  return (
    <SchemeContext.Provider
      value={{
        schemes,
        handleScheme: (newSchemes: Array<IComponentSchema>) => setSchemes([...newSchemes]),
        addScheme,
        moveScheme,
        deleteScheme,
      }}
    >
      {children}
    </SchemeContext.Provider>
  )
}

export default SchemeContextSection
