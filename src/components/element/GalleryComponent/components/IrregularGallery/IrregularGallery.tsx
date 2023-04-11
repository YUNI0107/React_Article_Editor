// types
import { IGalleryImage } from '../../../../../types/editor'

const galleryGridClassNames = [
  'col-span-2',
  'col-span-1 row-span-2',
  'col-span-1 row-span-2',
  'col-span-2 row-span-2',
  'col-span-2 row-span-1',
]

function IrregularGallery({
  images,
  handleModalShow,
}: {
  images: Array<IGalleryImage>
  handleModalShow: (index: number) => void
}) {
  return (
    <>
      <div className="max-h-[800px] grid grid-cols-4 grid-rows-3 gap-2">
        {images.slice(0, 5).map((image, index) => (
          <div
            key={image.id}
            className={galleryGridClassNames[index]}
            onClick={() => handleModalShow(index)}
          >
            <img src={image.imgPath} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {images.length > 5 && (
        <div className="flex w-full justify-end">
          <p className="font-bold mt-2" onClick={() => handleModalShow(5)}>
            查看更多 &gt;
          </p>
        </div>
      )}
    </>
  )
}

export default IrregularGallery
