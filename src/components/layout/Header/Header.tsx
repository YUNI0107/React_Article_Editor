import { useContext, useState } from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

// context
import { SchemaContext } from '../../../contexts/SchemaContextSection'

// components
import ModalBackground from '../../common/ModalBackground'

// types
import { IPublishedData } from '../../../types/editor'
import html2canvas from 'html2canvas-objectfit-fix'

// utils
import createFileFromCanvas from '../../../utils/createFileFromCanvas'

function Header({
  setIsPublishing,
  setPublishedData,
  editorSection,
}: {
  setIsPublishing: (isPublishing: boolean) => void
  setPublishedData: (data: IPublishedData) => void
  editorSection: React.MutableRefObject<HTMLDivElement>
}) {
  const [isModalShow, setIsModalShow] = useState(false)
  const location = useLocation()
  const isPreview = location.pathname === '/preview'
  const { title, author, schemas } = useContext(SchemaContext)

  const isCompleted = !!(title && author)

  const handleUnCompleted = () => {
    if (isCompleted) return
    setIsModalShow(true)
  }

  const uploadPreviewImage = (canvas: HTMLCanvasElement) => {
    const file = createFileFromCanvas(canvas)

    const formData = new FormData()
    formData.append('image', file)
    const fileName = `${Date.now()}_preview_image.png`
    const queryParams = new URLSearchParams({ key: fileName }).toString()

    return new Promise<string>((resolve, reject) => {
      fetch(`${process.env.REACT_APP_SERVER_URL}/image/upload/?${queryParams}`, {
        body: formData,
        method: 'POST',
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result.url)
        })
        .catch((error) => {
          reject()
          console.error(`Upload: ${error}`)
        })
    })
  }

  const uploadArticle = (
    schemas: string,
    title: string,
    author: string,
    timestamp: number,
    previewImage: string
  ) => {
    return new Promise<{ result: string }>((resolve, reject) => {
      fetch(`${process.env.REACT_APP_SERVER_URL}/article/upload`, {
        body: JSON.stringify({
          title,
          author,
          timestamp,
          schemas,
          previewImage,
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject()
          console.error(`Upload: ${error}`)
        })
    })
  }

  const submitPublishedSchemas = () => {
    const timestamp = Date.now()
    setIsPublishing(true)

    editorSection.current.style.paddingTop = '20px'
    editorSection.current.style.paddingBottom = '20px'

    html2canvas(editorSection.current).then(async (canvas) => {
      const previewImage = await uploadPreviewImage(canvas)
      setPublishedData({ schemas, title, author, timestamp, previewImage })
      await uploadArticle(JSON.stringify(schemas), title, author, timestamp, previewImage)
      setIsPublishing(false)
    })
  }

  return (
    <>
      <div className="fixed z-30 w-full bg-white h-20 flex flex-col basic-shadow">
        {/* top */}
        <div className="flex-1 flex justify-end px-5 items-center">
          <div onClick={handleUnCompleted}>
            <Link
              to={isPreview ? '/' : '/preview'}
              className={classNames({ 'pointer-events-none': !isCompleted })}
            >
              <button
                className={classNames(
                  'default-button  text-white font-semibold mr-2',
                  isCompleted ? 'bg-main-yellow' : 'bg-main-gray-400'
                )}
              >
                {isPreview ? 'Back to Edit Page' : 'Preview'}
              </button>
            </Link>
          </div>

          <div onClick={handleUnCompleted}>
            <Link
              to="/publish"
              onClick={submitPublishedSchemas}
              className={classNames({ 'pointer-events-none': !isCompleted })}
            >
              {!isPreview && (
                <button
                  className={classNames(
                    'default-button  text-white font-semibold',
                    isCompleted ? 'bg-main-blue' : 'bg-main-gray-400'
                  )}
                >
                  Publish
                </button>
              )}
            </Link>
          </div>
        </div>

        {/* bottom */}
        <div className="w-full bg-main-gray-300 h-7 relative"></div>
      </div>

      <ModalBackground isModalShow={isModalShow} setIsModalShow={setIsModalShow}>
        <div className="relative w-full bg-white max-w-[480px] py-5 px-10 rounded-lg">
          <h1 className="mb-2 text-main-blue font-bold">請填寫作者與文章標題</h1>
          <p>作者與文章標題為必填，請至左側文章設定進行填寫。</p>

          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setIsModalShow(false)}
          >
            <i className="ri-close-fill text-2xl cursor-pointer text-main-blue"></i>
          </div>
        </div>
      </ModalBackground>
    </>
  )
}

export default Header
