import { ReactNode, createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import update from 'immutability-helper'

// constants
import { groupTypeEnum } from '../../constants/enums/editorEnums'

// types
import { IComponentSchema, IImages } from '../../types/editor'

// utils
import ControlHandler from '../../utils/controlHandler'

// temp
import { paragraphJsonContent, titleJsonContent } from '../../constants/defaultTextEditorContent'

const uuid1 = uuidv4()
const uuid1_1 = uuidv4()
const uuid1_2 = uuidv4()
const uuid1_3 = uuidv4()

const defaultSchemas: {
  schemas: Array<IComponentSchema>
  handleSchema: (newSchemas: Array<IComponentSchema>) => void
  addSchema: (newSchema: IComponentSchema) => void
  moveSchema: (schemaUuid: string, direction: 'up' | 'down') => void
  deleteSchema: (schemaUuid: string) => void
  dragMoveSchema: (dragIndex: number, hoverIndex: number) => void
  controlHandler?: ControlHandler
  title: string
  setTitle: (value: string) => void
  author: string
  setAuthor: (value: string) => void
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
  title: '',
  setTitle: (value: string) => {
    console.log(value)
  },
  author: '',
  setAuthor: (value: string) => {
    console.log(value)
  },
}

export const SchemaContext = createContext(defaultSchemas)

function SchemaContextSection({ children }: { children: ReactNode }) {
  const a: IImages = {
    uuid: uuid1,
    groupType: groupTypeEnum.images,
    type: 'triplicate-square',
    props: {},
    children: [
      {
        uuid: uuid1_1,
        groupType: groupTypeEnum.image,
        props: {
          imgPath:
            'https://images.unsplash.com/photo-1677644334825-0eb411012ac0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2143&q=80',
          clickEvent: 'image-popup',
          textShowChecks: {
            title: true,
            description: true,
          },
          title: titleJsonContent,
          description: paragraphJsonContent,
          filter: '',
        },
      },
      {
        uuid: uuid1_2,
        groupType: groupTypeEnum.image,
        props: {
          imgPath:
            'https://images.unsplash.com/photo-1677443030437-93c9f5e08ae6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80',
          clickEvent: 'image-popup',
          textShowChecks: {
            title: true,
            description: true,
          },
          title: titleJsonContent,
          description: paragraphJsonContent,
          filter: '',
        },
      },
      {
        uuid: uuid1_3,
        groupType: groupTypeEnum.image,
        props: {
          imgPath:
            'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80',
          clickEvent: 'image-popup',
          textShowChecks: {
            title: true,
            description: true,
          },
          title: titleJsonContent,
          description: paragraphJsonContent,
          filter: '',
        },
      },
    ],
  }
  const [schemas, setSchemas] = useState<Array<IComponentSchema>>([a])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

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
    exchangeSchema(dragIndex, hoverIndex)
  }

  const deleteSchema = (schemaUuid: string) => {
    setSchemas((prevSchema) => {
      const arrangeSchemas = prevSchema.filter((schema) => schema.uuid !== schemaUuid)
      return arrangeSchemas
    })
  }

  const handleSchema = (newSchemas: Array<IComponentSchema>) => {
    setSchemas([...newSchemas])
  }

  const controlHandler = new ControlHandler(schemas, handleSchema)

  return (
    <SchemaContext.Provider
      value={{
        schemas,
        handleSchema,
        addSchema,
        moveSchema,
        deleteSchema,
        dragMoveSchema,
        controlHandler,
        title,
        setTitle,
        author,
        setAuthor,
      }}
    >
      {children}
    </SchemaContext.Provider>
  )
}

export default SchemaContextSection
