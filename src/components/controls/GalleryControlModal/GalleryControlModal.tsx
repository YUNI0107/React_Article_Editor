import { useState, useEffect, useContext } from 'react'
import classNames from 'classnames'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

// components
import ImageBlockControl from './ImageBlockControl'

// types
import { IGalleryImage } from '../../../types/editor'

const ImageBlock = ({
  image,
  isSorting,
  sortNumber,
  isSelected,
  selectImageBlock,
}: {
  image: IGalleryImage
  isSorting: boolean
  sortNumber: number
  isSelected: boolean
  selectImageBlock: () => void
}) => {
  return (
    <div
      onClick={selectImageBlock}
      className={classNames('relative w-full pt-[100%] overflow-hidden', {
        'cursor-move shadow-md': isSorting,
        'ring-main-blue ring-2': isSelected,
      })}
    >
      {/* controls ui */}
      <div className="absolute top-0 left-0 w-full h-full z-10">
        {isSorting ? (
          <div className="w-full h-full bg-white bg-opacity-30 flex justify-center items-center">
            <i className="ri-align-justify text-5xl text-white"></i>
          </div>
        ) : (
          <>
            <button className="absolute right-1">
              <i className="ri-close-line text-white text-2xl hover:text-main-gray-200"></i>
            </button>

            <div className="absolute left-2 bottom-2 flex justify-center items-center w-[24px] h-[24px] bg-white rounded-full shadow-sm">
              <p className="text-main-gray-500 font-bold">{sortNumber}</p>
            </div>
          </>
        )}
      </div>

      <img src={image.imgPath} className="absolute top-0 left-0 w-full h-full object-cover" />
    </div>
  )
}

function GalleryControlModal({ handleModalClose }: { handleModalClose: () => void }) {
  const { focusElementSchema } = useContext(EditorInfoContext)

  const [isSorting, setIsSorting] = useState(false)
  const [currentSelect, setCurrentSelect] = useState<number | null>(null)
  const [modalImages, setModalImages] = useState(focusElementSchema?.props?.images || [])

  // operation
  const confirmSortResult = () => {
    setIsSorting(false)
  }

  const selectImageBlock = (currentIndex: number) => {
    if (!isSorting) {
      setCurrentSelect(currentIndex)
    }
  }

  const handleModalConfirm = () => {
    setModalImages([])
  }

  // effects
  useEffect(() => {
    setCurrentSelect(null)
  }, [isSorting])

  return (
    <>
      <div className="bg-white rounded-lg basic-shadow max-w-[1000px] w-[100vw]">
        {/* header */}
        <div className="bg-main-blue w-full px-3 py-2 flex justify-between items-center rounded-t-lg">
          <h1 className="text-base text-white font-bold">圖庫設定</h1>

          <button onClick={handleModalClose}>
            <i className="ri-close-fill text-[28px] text-white hover:text-main-gray-300"></i>
          </button>
        </div>
        {/* main */}
        <div className="flex w-full h-[500px]">
          <div className="flex-2 border-r-[1px] flex flex-col py-5 px-4">
            <div className="flex-1">
              <div className="mb-4 min-h-[35px]">
                {isSorting ? (
                  <div className="flex items-center">
                    <button
                      className="font-bold mr-4 hover:text-main-gray-500"
                      onClick={confirmSortResult}
                    >
                      <h2>確認新排序</h2>
                    </button>
                    <button
                      className="font-bold text-main-gray-400 hover:text-main-gray-500"
                      onClick={() => setIsSorting(false)}
                    >
                      <h2>取消排序</h2>
                    </button>
                  </div>
                ) : (
                  <button
                    className="flex items-center hover:text-main-gray-500"
                    onClick={() => setIsSorting(true)}
                  >
                    <i className="ri-align-justify text-2xl mr-1"></i>
                    <h2 className="font-bold">重新排序</h2>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-4 gap-1">
                {modalImages.map((item, index) => {
                  return (
                    <ImageBlock
                      key={index}
                      image={item}
                      sortNumber={index + 1}
                      isSorting={isSorting}
                      isSelected={currentSelect === index}
                      selectImageBlock={() => selectImageBlock(index)}
                    />
                  )
                })}
              </div>
            </div>

            <div>
              <p className="font-bold">
                <span className="text-4xl mr-1">8</span>
                <span className="mr-2">張</span>
                可呈現此圖庫的最佳效果
              </p>
            </div>
          </div>
          <div className="flex-1 py-5 px-4 flex flex-col">
            <div className="flex-1 flex justify-center flex-col">
              <ImageBlockControl />
            </div>
            <div className="flex justify-end">
              <button className="py-1 px-5 mr-4 rounded-md ring-1 ring-main-blue text-main-blue font-bold hover:bg-main-gray-200">
                Cancel
              </button>
              <button
                className="py-1 px-5 rounded-md ring-1 ring-main-blue text-white font-bold bg-main-blue hover:brightness-90"
                onClick={handleModalConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GalleryControlModal
