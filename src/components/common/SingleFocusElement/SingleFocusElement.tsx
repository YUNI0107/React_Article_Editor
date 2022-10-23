// components
import FocusElement from '../FocusElement'

// types
import { ISingleSchema } from '../../../types/editor'

function SingleFocusElement({
  schema,
  schemaIndex,
}: {
  schema: ISingleSchema
  schemaIndex: number
}) {
  return (
    <FocusElement schema={schema} schemaIndex={schemaIndex} id={schema.uuid} key={schema.uuid} />
  )
}

export default SingleFocusElement
