// components
import AddBlock from './components/AddBlock'

// images
import AddBannerImage from '../../../../../assets/add/banner.png'
import AddButton from '../../../../../assets/add/button.png'
import TriplicateSquareImage from '../../../../../assets/add/triplicate-square.png'
import TriplicateCircleImage from '../../../../../assets/add/triplicate-circle.png'
import TriplicateRectImage from '../../../../../assets/add/triplicate-rectangle.png'
import DoubleSquareImage from '../../../../../assets/add/double-square.png'
import DoubleCircleImage from '../../../../../assets/add/double-circle.png'
import DoubleRectImage from '../../../../../assets/add/double-rectangle.png'
import ParagraphImage from '../../../../../assets/add/paragraph.png'
import NineSquareImage from '../../../../../assets/add/nine-square.png'
import FenceImage from '../../../../../assets/add/fence.png'
import CarouselImage from '../../../../../assets/add/carousel.png'
import IrregularImage from '../../../../../assets/add/irregular.png'

// default schema
import {
  defaultBannerSchema,
  getRandomDefaultButtonSchema,
  getRandomImagesSchema,
  defaultParagraph,
  getRandomGallerySchema,
} from '../../../../../constants/defaultComponentSchema'

function AddDrawer({ setIsShow }: { setIsShow: (isShow: boolean) => void }) {
  return (
    <>
      {/* top-section */}

      <div className="mb-10">
        <div className="flex justify-between items-center mb-[10px]">
          <div className="flex justify-center items-center">
            <i className="ri-add-fill text-[32px] text-main-blue mr-[2px]"></i>
            <h1 className="font-extrabold">新增模組</h1>
          </div>
          <button onClick={() => setIsShow(false)}>
            <i className="ri-close-fill text-[32px] text-main-gray-400 hover:text-main-blue"></i>
          </button>
        </div>
        <p>點擊新增模組</p>
      </div>

      {/* block section */}
      <AddBlock
        title="文字段落模組"
        blocks={[
          {
            imgPath: ParagraphImage,
            defaultSchema: () => defaultParagraph,
          },
        ]}
      />

      <AddBlock
        title="帶狀圖片模組"
        blocks={[
          {
            imgPath: AddBannerImage,
            defaultSchema: () => defaultBannerSchema,
          },
        ]}
      />

      <AddBlock
        title="按鈕模組"
        blocks={[
          {
            imgPath: AddButton,
            defaultSchema: getRandomDefaultButtonSchema,
          },
        ]}
      />

      <AddBlock
        title="圖片模組"
        blocks={[
          {
            imgPath: TriplicateSquareImage,
            defaultSchema: () => getRandomImagesSchema('triplicate-square'),
          },
          {
            imgPath: TriplicateCircleImage,
            defaultSchema: () => getRandomImagesSchema('triplicate-circle'),
          },
          {
            imgPath: TriplicateRectImage,
            defaultSchema: () => getRandomImagesSchema('triplicate-rectangle'),
          },
          {
            imgPath: DoubleSquareImage,
            defaultSchema: () => getRandomImagesSchema('double-square'),
          },
          {
            imgPath: DoubleCircleImage,
            defaultSchema: () => getRandomImagesSchema('double-circle'),
          },
          {
            imgPath: DoubleRectImage,
            defaultSchema: () => getRandomImagesSchema('double-rectangle'),
          },
        ]}
      />

      <AddBlock
        title="圖庫模組"
        blocks={[
          {
            imgPath: NineSquareImage,
            defaultSchema: () => getRandomGallerySchema('nine-square'),
          },
          {
            imgPath: FenceImage,
            defaultSchema: () => getRandomGallerySchema('fence'),
          },
          {
            imgPath: CarouselImage,
            defaultSchema: () => getRandomGallerySchema('carousel'),
          },
          {
            imgPath: IrregularImage,
            defaultSchema: () => getRandomGallerySchema('irregular'),
          },
        ]}
      />
    </>
  )
}

export default AddDrawer
