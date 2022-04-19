import { useContext } from 'react'

// components
import FocusElement from '../../common/FocusElement/FocusElement'

// types
import { SchemeContext } from '../../../contexts/SchemeContextSection'
import { IImages } from '../../../types/editor'

function EditorSection() {
  const { schemes } = useContext(SchemeContext)

  return (
    <div>
      <FocusElement scheme={schemes[0] as IImages} />
    </div>
  )
}

export default EditorSection
