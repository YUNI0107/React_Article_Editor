import { useState } from 'react'
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

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<MainPage publishedData={publishedData} setPublishedData={setPublishedData} />}
        >
          <Route index element={<EditorPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Route>

        <Route path="/publish" element={<PublishPage publishedData={publishedData} />} />
      </Routes>
    </>
  )
}

export default App
