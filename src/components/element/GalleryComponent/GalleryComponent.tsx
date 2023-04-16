import { useState, useContext } from 'react'
import classNames from 'classnames'

// components
import IconRectangleButton from '../../common/IconRectangleButton/IconRectangleButton'
import ModalBackground from '../../common/ModalBackground'
import CarouselGallery from './components/CarouselGallery'

// types
import { IGallery } from '../../../types/editor'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

// constants
import { galleryTypeList } from '../../../constants/gallery'

function GalleryComponent({ schema, isButtonShow }: { schema: IGallery; isButtonShow: boolean }) {
  const buttonStyle = isButtonShow ? 'block' : 'hidden pointer-events-none'
  const { setIsModalShow, previewMode } = useContext(EditorInfoContext)
  const [isGalleryDetailModalShow, setIsGalleryDetailModalShow] = useState(false)
  const [clickedIndex, setClickedIndex] = useState(0)
  const { type } = schema
  const Gallery = galleryTypeList[type].as

  // operations
  const handleModalShow = (index: number) => {
    setIsGalleryDetailModalShow(true)
    setClickedIndex(index)
  }

  if (!(schema.props && schema.props.images)) return null

  return (
    <>
      <div className="relative">
        <Gallery
          images={schema.props.images}
          handleModalShow={handleModalShow}
          previewMode={previewMode}
          isEditorMode
        />

        {/* modal */}
        <ModalBackground
          isModalShow={isGalleryDetailModalShow}
          setIsModalShow={setIsGalleryDetailModalShow}
        >
          <div className="w-full max-w-[800px]">
            <CarouselGallery
              images={schema.props.images}
              slideIndex={clickedIndex}
              onClose={() => setIsGalleryDetailModalShow(false)}
            />
          </div>
        </ModalBackground>

        {/* edit cover */}
        <div
          className={classNames(
            'absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-50',
            buttonStyle
          )}
        >
          <IconRectangleButton
            icon="ri-image-add-fill"
            onClick={() => setIsModalShow(true)}
            text="編輯圖庫"
            customClassNames={classNames(buttonStyle, 'my-5 mx-auto')}
          />
        </div>
      </div>
    </>
  )
}

export default GalleryComponent
