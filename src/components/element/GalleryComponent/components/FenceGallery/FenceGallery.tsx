// types
import { IGalleryImage } from '../../../../../types/editor'

function FenceGallery({
  images,
  handleModalShow,
}: {
  images: Array<IGalleryImage>
  handleModalShow: (index: number) => void
}) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-x-3">
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
