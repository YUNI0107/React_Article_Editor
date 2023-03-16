import classNames from 'classnames'
import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

// contexts
import { SchemaContext } from '../../../../../../../contexts/SchemaContextSection'

// types
import { IComponentSchema } from '../../../../../../../types/editor'

const EachBlock = ({
  imgPath,
  defaultSchema,
  addNewSchema,
}: {
  imgPath: string
  defaultSchema: () => Omit<IComponentSchema, 'uuid'>
  addNewSchema: (defaultSchema: () => Omit<IComponentSchema, 'uuid'>) => void
}) => {
  return (
    <div
      className="w-full border-2 border-main-gray-300 cursor-pointer"
      onClick={() => addNewSchema(defaultSchema)}
    >
      <img src={imgPath} />
    </div>
  )
}

function AddBlock({
  title,
  blocks,
}: {
  title: string
  blocks: Array<{
    imgPath: string
    defaultSchema: () => Omit<IComponentSchema, 'uuid'>
  }>
}) {
  const { addSchema } = useContext(SchemaContext)

  const addNewSchema = (defaultSchema: () => Omit<IComponentSchema, 'uuid'>) => {
    const uuid = uuidv4()
    const deepSchemaCopy = structuredClone(defaultSchema())

    const schema = {
      uuid,
      ...deepSchemaCopy,
    } as unknown as IComponentSchema

    if ('children' in schema) {
      schema.children.forEach((child) => {
        child.uuid = uuidv4()
      })
    }

    addSchema(schema)
  }

  return (
    <div className="mb-5">
      <p className="font-extrabold mb-[10px]">{title}</p>
      {blocks.map((block, index) => (
        <div key={index} className={classNames({ 'mb-2': index !== blocks.length - 1 })}>
          <EachBlock
            imgPath={block.imgPath}
            defaultSchema={block.defaultSchema}
            addNewSchema={addNewSchema}
          />
        </div>
      ))}
    </div>
  )
}

export default AddBlock
