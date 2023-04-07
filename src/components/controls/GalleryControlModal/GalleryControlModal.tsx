import { useState, useEffect, useContext, MouseEvent, useRef } from 'react'
import classNames from 'classnames'
import update from 'immutability-helper'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'
import { SchemaContext } from '../../../contexts/SchemaContextSection'

// components
import ImageBlockControl from './ImageBlockControl'

// types
import { galleryType, IGalleryImage } from '../../../types/editor'
import type { Identifier, XYCoord } from 'dnd-core'
import { useDrag, useDrop } from 'react-dnd'
import { IImageBlockDragItem } from '../../../types/layout'

// constants
import { galleryTypeList } from '../../../constants/gallery'

const defaultGalleryImage = {
  id: 'sdcsdcds',
  imgPath:
    'https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
  description: '',
}

const ImageBlock = ({
  image,
  isSorting,
  sortNumber,
  isSelected,
  index,
  id,
  selectImageBlock,
  deleteImage,
  moveImage,
}: {
  image: IGalleryImage
  isSorting: boolean
  sortNumber: number
  isSelected: boolean
  index: number
  id: string
  selectImageBlock: () => void
  deleteImage: () => void
  moveImage: (dragIndex: number, hoverIndex: number) => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    IImageBlockDragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'image-block',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: IImageBlockDragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards

      // Dragging right
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }

      // Dragging left
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return
      }

      // Time to actually perform the action
      moveImage(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'image-block',
    item: () => {
      return { id, index }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isSorting,
  })

  // operations
  const handleDeleteImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    deleteImage()
  }

  drag(drop(ref))

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      onClick={selectImageBlock}
      className={classNames('relative w-full pt-[100%] overflow-hidden box-border', {
        'cursor-move shadow-md': isSorting,
        'border-main-blue border-2': isSelected,
      })}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      {/* controls ui */}
      <div className="absolute top-0 left-0 w-full h-full z-10">
        {isSorting ? (
          <div className="w-full h-full bg-white bg-opacity-30 flex justify-center items-center">
            <i className="ri-align-justify text-5xl text-white"></i>
          </div>
        ) : (
          <>
            <button className="absolute right-1" onClick={handleDeleteImage}>
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
  const { controlHandler } = useContext(SchemaContext)
  const type = focusElementSchema && (focusElementSchema.type as galleryType)

  const [isSorting, setIsSorting] = useState(false)
  const [currentSelect, setCurrentSelect] = useState<number | null>(null)
  const [modalImages, setModalImages] = useState<Array<IGalleryImage>>(
    structuredClone(focusElementSchema?.props?.images) || []
  )
  const [sortingImages, setSortingImages] = useState<Array<IGalleryImage>>([])

  // operation
  const confirmSortResult = () => {
    setIsSorting(false)
    setModalImages(sortingImages)
  }

  const selectImageBlock = (currentIndex: number) => {
    if (!isSorting) {
      setCurrentSelect(currentIndex)
    }
  }

  const deleteImage = (targetIndex: number) => {
    setCurrentSelect(null)
    setModalImages((images) => images.filter((_, index) => targetIndex !== index))
  }

  const handleModalConfirm = () => {
    if (controlHandler && focusElementSchema) {
      controlHandler.changeValue('images', modalImages, focusElementSchema.uuid)
      handleModalClose()
    }
  }

  const addImage = () => {
    setModalImages((images) => {
      const addedImages = [...images, defaultGalleryImage]
      setCurrentSelect(modalImages.length)

      return addedImages
    })
  }

  const handleImageUpdate = (imagePath: string) => {
    if (currentSelect === null) return

    const selectImage = modalImages[currentSelect]
    selectImage.imgPath = imagePath

    setModalImages((images) => [
      ...images.slice(0, currentSelect),
      selectImage,
      ...images.slice(currentSelect + 1),
    ])
  }

  // sorting
  const startSorting = () => {
    setIsSorting(true)
    setSortingImages(modalImages)
  }

  const moveImage = (dragIndex: number, hoverIndex: number) => {
    setSortingImages((images) =>
      update(images, {
        $splice: [
          [hoverIndex, 1],
          [dragIndex, 0, images[hoverIndex]],
        ],
      })
    )
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
            <div className="flex-1 overflow-y-auto">
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
                    onClick={startSorting}
                  >
                    <i className="ri-align-justify text-2xl mr-1"></i>
                    <h2 className="font-bold">重新排序</h2>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-4 gap-1">
                {(isSorting ? sortingImages : modalImages).map((item, index) => {
                  return (
                    <ImageBlock
                      key={item.id}
                      id={item.id}
                      index={index}
                      image={item}
                      sortNumber={index + 1}
                      isSorting={isSorting}
                      isSelected={currentSelect === index}
                      selectImageBlock={() => selectImageBlock(index)}
                      deleteImage={() => deleteImage(index)}
                      moveImage={moveImage}
                    />
                  )
                })}

                {!isSorting && (
                  <div
                    className="relative border-2 border-main-blue border-dashed pt-[100%] cursor-pointer opacity-50 hover:opacity-100"
                    onClick={addImage}
                  >
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                      <i className="ri-add-circle-fill text-2xl text-main-blue"></i>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="font-bold">
                <span className="text-4xl mr-1">{type ? galleryTypeList[type].amount : 0}</span>
                <span className="mr-2">張</span>
                可呈現此圖庫的最佳效果
              </p>
            </div>
          </div>
          <div className="flex-1 py-5 px-4 flex flex-col">
            <div className="flex-1 flex justify-center flex-col">
              {currentSelect !== null && (
                <ImageBlockControl
                  selectImage={modalImages[currentSelect]}
                  handleImageUpdate={handleImageUpdate}
                />
              )}
            </div>
            <div className="flex justify-end">
              <button
                className="py-1 px-5 mr-4 rounded-md ring-1 ring-main-blue text-main-blue font-bold hover:bg-main-gray-200"
                onClick={handleModalClose}
              >
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
