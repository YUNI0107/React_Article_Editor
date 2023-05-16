// components
import PublishPageHeader from '../../components/layout/PublishPageHeader'

// types
import { IPublishedData } from '../../types/editor'

function PublishPage({ publishedData }: { publishedData: IPublishedData | null }) {
  console.log('publishedData', publishedData)

  return (
    <div className="w-screen min-h-screen bg-secondary-blue-100 flex flex-col">
      <PublishPageHeader />
      <div className="flex-1 flex h-full pt-20 overflow-y-auto">ddddd</div>
    </div>
  )
}

export default PublishPage
