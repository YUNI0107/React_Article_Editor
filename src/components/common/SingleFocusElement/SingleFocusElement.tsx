// components
import FocusElement from '../FocusElement'

// types
import { ISingleSchema } from '../../../types/editor'

function SingleFocusElement({ schema }: { schema: ISingleSchema }) {
  return <FocusElement schema={schema} key={schema.uuid} />
}

export default SingleFocusElement
