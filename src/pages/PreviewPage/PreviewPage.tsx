import { useContext } from 'react'

// contexts
import { SchemaContext } from '../../contexts/SchemaContextSection'
import EditorInfoContextSection from '../../contexts/EditorInfoContextSection'

// components
import EditorSection from '../../components/layout/EditorSection/EditorSection'

function PreviewPage() {
  const { schemas, title, author } = useContext(SchemaContext)
  console.log('schemas', schemas, title, author)
  return (
    <>
      <EditorInfoContextSection isEditorMode={false}>
        <EditorSection />
      </EditorInfoContextSection>

      {/* {title}
      {author}
      Test */}
    </>
  )
}

export default PreviewPage
