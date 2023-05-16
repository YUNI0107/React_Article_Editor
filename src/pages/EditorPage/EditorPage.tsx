import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// contexts
import EditorInfoContextSection from '../../contexts/EditorInfoContextSection'
import MainEditorContainer from './components/EditorContainer'

// components
import Drawer from '../../components/layout/Drawer'

function EditorPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* left-drawer */}
      <Drawer />

      <EditorInfoContextSection isEditorMode>
        {/* main-editor-container */}
        <MainEditorContainer />
      </EditorInfoContextSection>
    </DndProvider>
  )
}

export default EditorPage
