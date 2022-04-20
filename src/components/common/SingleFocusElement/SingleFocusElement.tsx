// components
import FocusElement from '../FocusElement'

// types
import { ISingleSchema } from '../../../types/editor'

function SingleFocusElement({ scheme }: { scheme: ISingleSchema }) {
  return <FocusElement scheme={scheme} key={scheme.uuid} />
}

export default SingleFocusElement
