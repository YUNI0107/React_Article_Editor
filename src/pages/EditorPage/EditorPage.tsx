import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// contexts
import EditorInfoContextSection from '../../contexts/EditorInfoContextSection'
import MainEditorContainer from './components/EditorContainer'

// components
import Drawer from '../../components/layout/Drawer'

function EditorPage({ editorSection }: { editorSection: React.MutableRefObject<HTMLDivElement> }) {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* left-drawer */}
      <Drawer />

      <EditorInfoContextSection isEditorMode>
        {/* main-editor-container */}
        <MainEditorContainer editorSection={editorSection} />
      </EditorInfoContextSection>
    </DndProvider>
  )
}

export default EditorPage
