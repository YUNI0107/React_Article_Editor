import { useContext } from 'react'
import classNames from 'classnames'

// components
import IconRectangleButton from '../../common/IconRectangleButton/IconRectangleButton'

// types
import { IGallery } from '../../../types/editor'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

// constants
import { galleryTypeList } from '../../../constants/gallery'

function GalleryComponent({ schema, isButtonShow }: { schema: IGallery; isButtonShow: boolean }) {
  const buttonStyle = isButtonShow ? 'block' : 'hidden pointer-events-none'
  const { previewMode, setIsModalShow } = useContext(EditorInfoContext)
  const { type } = schema
  const Gallery = galleryTypeList[type].as

  return (
    <>
      <div className="relative">
        {schema.props?.images && <Gallery images={schema.props.images} />}

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
            isPreviewSmMode={previewMode === 'sm'}
          />
        </div>
      </div>
    </>
  )
}

export default GalleryComponent
