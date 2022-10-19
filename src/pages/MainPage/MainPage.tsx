import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// components
import Header from '../../components/layout/Header'
import Drawer from '../../components/layout/Drawer'

// contexts
import EditorInfoContextSection from '../../contexts/EditorInfoContextSection'
import MainEditorContainer from './components/MainEditorContainer'
import SchemaContextSection from '../../contexts/SchemaContextSection'

function MainPage() {
  return (
    <div className="w-screen min-h-screen min-w-[1052px] bg-secondary-blue-100 flex flex-col">
      <Header />

      <SchemaContextSection>
        <DndProvider backend={HTML5Backend}>
          <div className="flex-1 flex h-full pt-20 overflow-y-auto">
            {/* left-drawer */}
            <Drawer />

            {/* main-editor-container */}

            <EditorInfoContextSection>
              <MainEditorContainer />
            </EditorInfoContextSection>
          </div>
        </DndProvider>
      </SchemaContextSection>
    </div>
  )
}

export default MainPage
