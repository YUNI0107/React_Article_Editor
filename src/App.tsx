import { useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './styles/global.css'
import './styles/text.css'
import 'remixicon/fonts/remixicon.css'

// pages
import MainPage from './pages/MainPage'
import EditorPage from './pages/EditorPage'
import PreviewPage from './pages/PreviewPage'
import PublishPage from './pages/PublishPage'

// types
import { IPublishedData } from './types/editor'

function App() {
  const [publishedData, setPublishedData] = useState<IPublishedData | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const editorSection = useRef<HTMLDivElement>(null!)

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              publishedData={publishedData}
              setPublishedData={setPublishedData}
              editorSection={editorSection}
              setIsPublishing={setIsPublishing}
            />
          }
        >
          <Route index element={<EditorPage editorSection={editorSection} />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Route>

        <Route
          path="/publish"
          element={<PublishPage isPublishing={isPublishing} publishedData={publishedData} />}
        />
      </Routes>
    </>
  )
}

export default App
