import classNames from 'classnames'
import { Outlet, useLocation } from 'react-router-dom'

// components
import Header from '../../components/layout/Header'

// contexts
import SchemaContextSection from '../../contexts/SchemaContextSection'

// types
import { IPublishedData } from '../../types/editor'

function MainPage({
  publishedData,
  setPublishedData,
  editorSection,
  setIsPublishing,
}: {
  publishedData: IPublishedData | null
  setPublishedData: (data: IPublishedData) => void
  editorSection: React.MutableRefObject<HTMLDivElement>
  setIsPublishing: (isPublishing: boolean) => void
}) {
  const location = useLocation()
  const isPreview = location.pathname === '/preview'

  return (
    <div
      className={classNames('w-screen min-h-screen bg-secondary-blue-100 flex flex-col', {
        'min-w-[1052px]': !isPreview,
      })}
    >
      <SchemaContextSection publishedData={publishedData}>
        <Header
          setPublishedData={setPublishedData}
          editorSection={editorSection}
          setIsPublishing={setIsPublishing}
        />
        <div className="flex-1 flex h-full pt-20 overflow-y-auto">
          <Outlet />
        </div>
      </SchemaContextSection>
    </div>
  )
}

export default MainPage
