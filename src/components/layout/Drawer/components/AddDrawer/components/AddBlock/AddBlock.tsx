import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

// contexts
import { SchemeContext } from '../../../../../../../contexts/SchemeContextSection'

// types
import { groupTypes, IComponentSchema } from '../../../../../../../types/editor'

function AddBlock({
  title,
  imgPath,
  groupType,
  defaultScheme,
}: {
  title: string
  imgPath: string
  groupType: groupTypes
  defaultScheme: Omit<IComponentSchema, 'uuid'>
}) {
  const { addScheme } = useContext(SchemeContext)

  const addNewScheme = (defaultScheme: Omit<IComponentSchema, 'uuid'>) => {
    const uuid = uuidv4()
    const scheme = {
      uuid,
      ...defaultScheme,
    }

    addScheme(scheme as unknown as IComponentSchema)
  }

  return (
    <div className="mb-5">
      <p className="font-extrabold mb-[10px]">{title}</p>
      <div
        className="w-full border-2 border-main-gray-300 cursor-pointer"
        onClick={() => addNewScheme(defaultScheme)}
      >
        <img src={imgPath} alt={groupType} />
      </div>
    </div>
  )
}

export default AddBlock
