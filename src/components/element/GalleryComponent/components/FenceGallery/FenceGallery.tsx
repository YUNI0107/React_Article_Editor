// types
import { IGalleryImage } from '../../../../../types/editor'
import { PreviewModesType } from '../../../../../types/layout'

// utils
import getStyleSetting, { IStyleMapList } from '../../../../../utils/getStyleSetting'

const styleMapList: IStyleMapList = {
  general: 'grid grid-cols-3 gap-x-',
  publish: 'grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-x-2 lg:gap-x-3',
  editor: { sm: 'grid-cols-1 gap-y-2', md: 'grid-cols-3 gap-x-2', lg: 'grid-cols-3 gap-x-3' },
}

function FenceGallery({
  images,
  handleModalShow,
  previewMode,
  isEditorMode,
}: {
  images: Array<IGalleryImage>
  handleModalShow: (index: number) => void
  previewMode: PreviewModesType
  isEditorMode: boolean
}) {
  const styleSetting = getStyleSetting(styleMapList, previewMode, isEditorMode)

  return (
    <div>
      <div className={styleSetting}>
        {images.slice(0, 3).map((image, index) => (
          <div key={image.id} className="relative pb-[200%]" onClick={() => handleModalShow(index)}>
            <img src={image.imgPath} className="absolute top-0 left-0 w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {images.length > 3 && (
        <div className="flex w-full justify-end">
          <p className="font-bold mt-2" onClick={() => handleModalShow(3)}>
            查看更多 &gt;
          </p>
        </div>
      )}
    </div>
  )
}

export default FenceGallery
