// components
import Header from '../../components/layout/Header'
import Drawer from '../../components/layout/Drawer'

// contexts
import EditorInfoContextSection from '../../contexts/EditorInfoContextSection'
import MainEditorContainer from './components/MainEditorContainer'
import SchemeContextSection from '../../contexts/SchemeContextSection'

function MainPage() {
  return (
    <div className="w-screen min-h-screen min-w-[1052px] bg-secondary-blue-100 flex flex-col">
      <Header />

      <div className="flex-1 flex h-full pt-20">
        {/* left-drawer */}
        <Drawer />

        {/* main-editor-container */}
        <SchemeContextSection>
          <EditorInfoContextSection>
            <MainEditorContainer />
          </EditorInfoContextSection>
        </SchemeContextSection>
      </div>
    </div>
  )
}

export default MainPage
