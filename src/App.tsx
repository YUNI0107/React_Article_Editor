import { Routes, Route } from 'react-router-dom'

import './styles/global.css'
import './styles/text.css'
import 'remixicon/fonts/remixicon.css'

// pages
import MainPage from './pages/MainPage'
import EditorPage from './pages/EditorPage/EditorPage'
import PreviewPage from './pages/PreviewPage/PreviewPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<EditorPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
