import { ReactNode, createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import update from 'immutability-helper'

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
    imgPath:
      'https://images.unsplash.com/photo-1665989215795-f67f4723087d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    eventKey: 'image-popup',
  },
  controls: ['imgFilterControl', 'clickEventControl'],
}
const b: IBanner = {
  uuid: uuid2,
  groupType: groupTypeEnum.banner,
  type: 'banner',
  props: {
    imgPath:
      'https://images.unsplash.com/photo-1665989215795-f67f4723087d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    eventKey: 'image-popup',
  },
  controls: ['imgFilterControl', 'clickEventControl'],
}
const c: IBanner = {
  uuid: uuid3,
  groupType: groupTypeEnum.banner,
  type: 'banner',
  props: {
    imgPath:
      'https://images.unsplash.com/photo-1665989215795-f67f4723087d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    eventKey: 'image-popup',
  },
  controls: ['imgFilterControl', 'clickEventControl'],
}

const defaultSchemas: {
  schemas: Array<IComponentSchema>
  handleSchema: (newSchemas: Array<IComponentSchema>) => void
  addSchema: (newSchema: IComponentSchema) => void
  moveSchema: (schemaUuid: string, direction: 'up' | 'down') => void
  deleteSchema: (schemaUuid: string) => void
  dragMoveSchema: (dragIndex: number, hoverIndex: number) => void
} = {
  schemas: [],
  handleSchema: (newSchemas: Array<IComponentSchema>) => {
    console.log(newSchemas)
  },
  addSchema: (newSchema: IComponentSchema) => {
    console.log(newSchema)
  },
  moveSchema: (schemaUuid: string, direction: 'up' | 'down') => {
    console.log(schemaUuid, direction)
  },
  deleteSchema: (schemaUuid: string) => {
    console.log(schemaUuid)
  },
  dragMoveSchema: (dragIndex: number, hoverIndex: number) => {
    console.log(dragIndex, hoverIndex)
  },
}

export const SchemaContext = createContext(defaultSchemas)

function SchemaContextSection({ children }: { children: ReactNode }) {
  const [schemas, setSchemas] = useState<Array<IComponentSchema>>([a, b, c])

  const addSchema = (newSchema: IComponentSchema) => {
    setSchemas((prevSchema) => [...prevSchema, newSchema])
  }

  const moveSchema = (schemaUuid: string, direction: 'up' | 'down') => {
    const targetIndex = schemas.findIndex((schema) => schema.uuid === schemaUuid)

    if (
      (targetIndex === 0 && direction === 'up') ||
      (targetIndex === schemas.length - 1 && direction === 'down')
    ) {
      // Check: If the schema is at the limit, can't move it
      return
    }

    const newIndex = direction === 'up' ? targetIndex - 1 : targetIndex + 1
    exchangeSchema(targetIndex, newIndex)
  }

  const exchangeSchema = (originalIndex: number, newIndex: number) => {
    setSchemas((prevSchema: Array<IComponentSchema>) =>
      update(prevSchema, {
        $splice: [
          [newIndex, 1],
          [originalIndex, 0, prevSchema[newIndex] as IComponentSchema],
        ],
      })
    )
  }

  const dragMoveSchema = (dragIndex: number, hoverIndex: number) => {
    exchangeSchema(hoverIndex, dragIndex)
  }

  const deleteSchema = (schemaUuid: string) => {
    setSchemas((prevSchema) => {
      const arrangeSchemas = prevSchema.filter((schema) => schema.uuid !== schemaUuid)
      return arrangeSchemas
    })
  }

  return (
    <SchemaContext.Provider
      value={{
        schemas,
        handleSchema: (newSchemas: Array<IComponentSchema>) => setSchemas([...newSchemas]),
        addSchema,
        moveSchema,
        deleteSchema,
        dragMoveSchema,
      }}
    >
      {children}
    </SchemaContext.Provider>
  )
}

export default SchemaContextSection
