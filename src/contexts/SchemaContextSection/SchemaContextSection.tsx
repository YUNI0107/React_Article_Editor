import { ReactNode, createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import update from 'immutability-helper'

// constants
import { groupTypeEnum } from '../../constants/enums/editorEnums'

// types
import { IComponentSchema, IButton } from '../../types/editor'

// utils
import ControlHandler from '../../utils/controlHandler'

// temp
import { paragraphJsonContent } from '../../constants/defaultContent'

const uuid1 = uuidv4()
const uuid3 = uuidv4()
const uuid5 = uuidv4()

const defaultSchemas: {
  schemas: Array<IComponentSchema>
  handleSchema: (newSchemas: Array<IComponentSchema>) => void
  addSchema: (newSchema: IComponentSchema) => void
  moveSchema: (schemaUuid: string, direction: 'up' | 'down') => void
  deleteSchema: (schemaUuid: string) => void
  dragMoveSchema: (dragIndex: number, hoverIndex: number) => void
  controlHandler?: ControlHandler
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
  const a: IButton = {
    uuid: uuid1,
    groupType: groupTypeEnum.button,
    type: 'button',
    props: {
      innerParagraph: paragraphJsonContent,
      backgroundColor: '#E800E8',
      borderColor: '#000',
      borderWidth: 2,
      roundedKey: 'circle',
      customRounded: {
        leftTop: 0,
        rightTop: 0,
        rightBottom: 0,
        leftBottom: 0,
      },
      padding: {
        x: 10,
        y: 5,
      },
      alignment: 'left',
      isLinkBlank: true,
    },
  }
  const b: IButton = {
    uuid: uuid3,
    groupType: groupTypeEnum.button,
    type: 'button',
    props: {
      innerParagraph: paragraphJsonContent,
      backgroundColor: '#1AFD9C',
      borderColor: '#000',
      borderWidth: 2,
      roundedKey: 'none',
      customRounded: {
        leftTop: 0,
        rightTop: 0,
        rightBottom: 0,
        leftBottom: 0,
      },
      padding: {
        x: 20,
        y: 20,
      },
      alignment: 'center',
      isLinkBlank: true,
    },
  }
  const c: IButton = {
    uuid: uuid5,
    groupType: groupTypeEnum.button,
    type: 'button',
    props: {
      innerParagraph: paragraphJsonContent,
      backgroundColor: '#2894FF',
      borderColor: '#000',
      borderWidth: 2,
      roundedKey: 'custom',
      customRounded: {
        leftTop: 0,
        rightTop: 0,
        rightBottom: 0,
        leftBottom: 0,
      },
      padding: {
        x: 0,
        y: 0,
      },
      alignment: 'right',
      isLinkBlank: true,
    },
  }
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
      }}
    >
      {children}
    </SchemaContext.Provider>
  )
}

export default SchemaContextSection
