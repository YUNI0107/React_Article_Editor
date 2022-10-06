// components
import AddBlock from './components/AddBlock'

// images
import AddBannerImage from '../../../../../assets/add/banner.png'

// types
import { groupTypeEnum } from '../../../../../constants/enums/editorEnums'
import { IBanner } from '../../../../../types/editor'

function AddDrawer({ setIsShow }: { setIsShow: (isShow: boolean) => void }) {
  const defaultBannerScheme: Omit<IBanner, 'uuid'> = {
    groupType: groupTypeEnum.banner,
    type: 'banner',
    props: {
      imgPath: 'https://miro.medium.com/max/1400/1*nUwBNo9xbZ1Yn7hAqd9oXg.png',
    },
    controls: ['imgFilterControl', 'clickEventControl'],
  }

  return (
    <>
      {/* top-section */}
      <div>
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
          <p>以拖曳或點擊新增模組</p>
        </div>

        {/* block section */}
        <AddBlock
          title="帶狀圖片模組"
          imgPath={AddBannerImage}
          groupType={groupTypeEnum.banner}
          defaultScheme={defaultBannerScheme}
        />
      </div>
    </>
  )
}

export default AddDrawer
