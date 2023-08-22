// components
import PublishPageHeader from '../../components/layout/PublishPageHeader'

// types
import { IPublishedData } from '../../types/editor'

const CopyButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <span
      className="text-lg text-main-gray-500 cursor-pointer hover:text-main-gray-400"
      onClick={onClick}
    >
      <i className="ri-file-copy-2-fill"></i>
    </span>
  )
}

function PublishPage({
  publishedData,
  isPublishing,
}: {
  publishedData: IPublishedData | null
  isPublishing: boolean
}) {
  if (publishedData === null && !isPublishing) {
    return <div className="w-screen min-h-screen bg-secondary-blue-100 flex flex-col">Back</div>
  }

  const schemaText = publishedData ? JSON.stringify(publishedData.schemas) : ''
  const timeText = Date.now()

  const copyText = (text: string) => {
    if (!text) return

    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard')
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
      })
  }

  return (
    <div className="w-screen min-h-screen bg-secondary-blue-100 flex flex-col">
      <PublishPageHeader />

      <div className="flex-1 flex w-screen h-full pt-20 overflow-y-auto justify-center items-center px-40">
        {isPublishing || !publishedData ? (
          <i className="ri-loader-2-line text-7xl text-main-blue animate-spin"></i>
        ) : (
          <>
            <div className="flex justify-center items-start w-[440px] h-[620px] min-w-[440px] overflow-hidden bg-white drop-shadow mr-10">
              <img className="object-contain" src={publishedData.previewImage} alt="previewImage" />
            </div>

            <div className="flex-1">
              <div className="relative flex items-baseline mb-4">
                <p className="font-bold mr-8 w-32">文章標題</p>
                <h1 className="text-6xl">
                  {publishedData.title} <CopyButton onClick={() => copyText(publishedData.title)} />
                </h1>
              </div>

              <div className="relative flex items-baseline mb-4">
                <p className="font-bold mr-8 w-32">作者</p>
                <h1 className="text-sm">
                  {publishedData.author}{' '}
                  <CopyButton onClick={() => copyText(publishedData.author)} />
                </h1>
              </div>

              <div className="relative flex items-baseline">
                <p className="font-bold mr-8 w-32">TimeStamp</p>
                <h1 className="text-sm">
                  {timeText} <CopyButton onClick={() => copyText(`${timeText}`)} />
                </h1>
              </div>

              <div className="flex max-w-[800px] h-[420px] bg-white mt-10 rounded-2xl flex-col overflow-hidden">
                <div className="px-6 bg-main-blue text-white w-full h-12 flex items-center justify-end">
                  <p
                    className="flex items-center cursor-pointer hover:text-main-gray-200"
                    onClick={() => copyText(schemaText)}
                  >
                    <i className="ri-file-copy-2-fill text-xl mr-1"></i>
                    <span className="text-base">Copy Schemas</span>
                  </p>
                </div>
                <div className="flex-1 overflow-y-scroll p-6">
                  <p className="whitespace-normal">{schemaText}</p>
                </div>

                <div className="px-6 bg-white text-white w-full h-12 flex items-center justify-end">
                  <a target="_blank" href="https://github.com/YUNI0107" rel="noreferrer">
                    <i className="ri-github-fill text-3xl text-main-gray-300"></i>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PublishPage
