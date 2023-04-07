// types
import { IGalleryImage } from '../../../../../types/editor'

function NineSquareGallery({ images }: { images: Array<IGalleryImage> }) {
  return (
    <div className="px-5">
      <div className="grid grid-cols-3 gap-2">
        {images.slice(0, 9).map((image, index) => {
          return (
            <div key={index} className="relative w-full pb-[100%] overflow-hidden ">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={image.imgPath}
              />
            </div>
          )
        })}
      </div>

      {images.length > 9 && (
        <div className="flex w-full justify-end">
          <p className="font-bold mt-2">查看更多 &gt;</p>
        </div>
      )}
    </div>
  )
}

export default NineSquareGallery
