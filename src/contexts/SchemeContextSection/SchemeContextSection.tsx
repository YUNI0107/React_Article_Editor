import { ReactNode, createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// types
import { IComponentSchema, IBanner } from '../../types/editor'

const uuid1 = uuidv4()

const a: IBanner = {
  uuid: uuid1,
  groupType: 'banner',
  type: 'banner',
  props: {
    imgPath: 'https://miro.medium.com/max/1400/1*nUwBNo9xbZ1Yn7hAqd9oXg.png',
  },
  controls: ['imgPathControl'],
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
  const [schemes, setSchemes] = useState<Array<IComponentSchema>>([a])

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
