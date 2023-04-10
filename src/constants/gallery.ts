// components
import NineSquareGallery from '../components/element/GalleryComponent/components/NineSquareGallery'
import CarouselGallery from '../components/element/GalleryComponent/components/CarouselGallery'
import FenceGallery from '../components/element/GalleryComponent/components/FenceGallery'
import IrregularGallery from '../components/element/GalleryComponent/components/IrregularGallery'

export const galleryTypeList = {
  'nine-square': {
    as: NineSquareGallery,
    amount: 9,
  },
  fence: {
    as: FenceGallery,
    amount: 3,
  },
  carousel: {
    as: CarouselGallery,
    amount: 6,
  },
  irregular: {
    as: IrregularGallery,
    amount: 5,
  },
}
