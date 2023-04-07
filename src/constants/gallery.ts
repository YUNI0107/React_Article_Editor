// components
import NineSquareGallery from '../components/element/GalleryComponent/components/NineSquareGallery'
import CarouselGallery from '../components/element/GalleryComponent/components/CarouselGallery'

export const galleryTypeList = {
  'nine-square': {
    as: NineSquareGallery,
    amount: 9,
  },
  fence: {
    as: NineSquareGallery,
    amount: 5,
  },
  carousel: {
    as: CarouselGallery,
    amount: 6,
  },
  irregular: {
    as: NineSquareGallery,
    amount: 5,
  },
}
