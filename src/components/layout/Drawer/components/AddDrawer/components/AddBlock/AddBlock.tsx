import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

// contexts
import { SchemaContext } from '../../../../../../../contexts/SchemaContextSection'

// types
import { groupTypes, IComponentSchema } from '../../../../../../../types/editor'

function AddBlock({
  title,
  imgPath,
  groupType,
  defaultSchema,
}: {
  title: string
  imgPath: string
  groupType: groupTypes
  defaultSchema: () => Omit<IComponentSchema, 'uuid'>
}) {
  const { addSchema } = useContext(SchemaContext)

  const addNewSchema = (defaultSchema: () => Omit<IComponentSchema, 'uuid'>) => {
    const uuid = uuidv4()
    const deepSchemaCopy = structuredClone(defaultSchema())
    const schema = {
      uuid,
      ...deepSchemaCopy,
    }

    addSchema(schema as unknown as IComponentSchema)
  }

  return (
    <div className="mb-5">
      <p className="font-extrabold mb-[10px]">{title}</p>
      <div
        className="w-full border-2 border-main-gray-300 cursor-pointer"
        onClick={() => addNewSchema(defaultSchema)}
      >
        <img src={imgPath} alt={groupType} />
      </div>
    </div>
  )
}

export default AddBlock
