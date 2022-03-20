import { useContext } from 'react'

// types
import { SchemeContext } from '../../../contexts/SchemeContextSection'
import { IImages } from '../../../types/editor'
import ImagesComponent from '../ImagesComponent'

function EditorSection() {
  const { schemes } = useContext(SchemeContext)

  return (
    <div>
      <ImagesComponent scheme={schemes[0] as IImages} />
      <ImagesComponent scheme={schemes[1] as IImages} />
    </div>
  )
}

export default EditorSection
