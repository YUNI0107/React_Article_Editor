import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Carousel from 'nuka-carousel'

// types
import { IGalleryImage } from '../../../../../types/editor'

const CarouselImage = ({ image }: { image: IGalleryImage }) => {
  return (
    <div className="relative w-full pt-[60%]">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={image.imgPath}
        alt={image.description}
      />

      {image.description && (
        <div className="z-20 absolute bottom-0 left-0 w-full  px-4 py-2 black-back-gradient">
          <p className="text-white">{image.description}</p>
        </div>
      )}
    </div>
  )
}

const BackgroundPaginationControls = ({
  paginationCurrent,
  currentSlide,
  goToSlide,
  updatePaginationCurrent,
}: {
  paginationCurrent: number
  currentSlide: number
  goToSlide: (targetIndex: number) => void
  updatePaginationCurrent: (targetIndex: number) => void
}) => {
  useEffect(() => {
    goToSlide(paginationCurrent)
  }, [paginationCurrent])

  useEffect(() => {
    updatePaginationCurrent(currentSlide)
  }, [currentSlide])

  return null
}
const PaginationDot = ({
  image,
  handleOnClick,
  isCurrent,
}: {
  image: string
  handleOnClick: () => void
  isCurrent: boolean
}) => {
  return (
    <div
      className={classNames('w-40 h-20', { 'opacity-25 cursor-pointer': !isCurrent })}
      onClick={handleOnClick}
    >
      <img className="w-full h-full object-cover" src={image} alt="pagination" />
    </div>
  )
}

const CustomPaginationControls = ({
  images,
  updatePaginationCurrent,
  paginationCurrent,
}: {
  images: Array<IGalleryImage>
  updatePaginationCurrent: (targetIndex: number) => void
  paginationCurrent: number
}) => {
  return (
    <div className="w-full flex mt-4 overflow-x-auto">
      {images.map((image, index) => (
        <div key={image.id} className={classNames({ 'mr-1': index !== images.length - 1 })}>
          <PaginationDot
            image={image.imgPath}
            handleOnClick={() => updatePaginationCurrent(index)}
            isCurrent={paginationCurrent === index}
          />
        </div>
      ))}
    </div>
  )
}

function CarouselGallery({
  images,
  autoplay,
  onClose,
}: {
  images: Array<IGalleryImage>
  autoplay?: boolean
  onClose?: () => void
}) {
  const [paginationCurrent, setPaginationCurrent] = useState(0)

  useEffect(() => {
    setPaginationCurrent(0)
  }, [images])

  return (
    <div className="relative">
      <Carousel
        autoplay={autoplay}
        defaultControlsConfig={{
          nextButtonClassName:
            'absolute w-10 h-10 right-4 flex justify-center items-center rounded-full',
          nextButtonText: <i className="ri-arrow-right-s-line text-2xl"></i>,
          prevButtonClassName:
            'absolute w-10 h-10 left-4 flex justify-center items-center rounded-full',
          prevButtonText: <i className="ri-arrow-left-s-line text-2xl"></i>,
        }}
        renderBottomCenterControls={(props) => (
          <BackgroundPaginationControls
            paginationCurrent={paginationCurrent}
            currentSlide={props.currentSlide}
            goToSlide={props.goToSlide}
            updatePaginationCurrent={(index) => setPaginationCurrent(index)}
          />
        )}
      >
        {images.map((image) => (
          <CarouselImage image={image} key={image.id} />
        ))}
      </Carousel>
      <CustomPaginationControls
        images={images}
        updatePaginationCurrent={(index) => setPaginationCurrent(index)}
        paginationCurrent={paginationCurrent}
      />

      {onClose && (
        <button className="absolute right-4 top-4" onClick={onClose}>
          <i
            className="ri-close-fill text-white text-4xl"
            style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' }}
          ></i>
        </button>
      )}
    </div>
  )
}

export default CarouselGallery
