import './App.css'

import EditorSection from './components/layout/EditorSection'
import SchemeContextSection from './contexts/SchemeContextSection'

function App() {
  return (
    <div className="App">
      <SchemeContextSection>
        <EditorSection />
      </SchemeContextSection>
    </div>
  )
}

export default App
