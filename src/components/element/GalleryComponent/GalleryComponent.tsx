import { useContext } from 'react'
import classNames from 'classnames'

// components
import IconRectangleButton from '../../common/IconRectangleButton/IconRectangleButton'

// types
import { IGallery } from '../../../types/editor'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function GalleryComponent({ schema, isButtonShow }: { schema: IGallery; isButtonShow: boolean }) {
  const buttonStyle = isButtonShow ? 'block' : 'hidden pointer-events-none'
  const { previewMode, setIsModalShow } = useContext(EditorInfoContext)

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-5">
          {schema.props?.images?.map((image, index) => {
            return (
              <div key={index} className="w-40 h-40 overflow-hidden ">
                <img className="w-full h-full object-cover" src={image.imgPath} />
              </div>
            )
          })}
        </div>

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
