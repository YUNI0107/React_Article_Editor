// components
import AddBlock from './components/AddBlock'

// images
import AddBannerImage from '../../../../../assets/add/banner.png'
import AddButton from '../../../../../assets/add/button.png'

// types
import { groupTypeEnum } from '../../../../../constants/enums/editorEnums'

// default schema
import {
  defaultBannerSchema,
  getRandomDefaultButtonSchema,
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
        <p>以拖曳或點擊新增模組</p>
      </div>

      {/* block section */}
      <AddBlock
        title="帶狀圖片模組"
        imgPath={AddBannerImage}
        groupType={groupTypeEnum.banner}
        defaultSchema={() => defaultBannerSchema}
      />
      <AddBlock
        title="按鈕模組"
        imgPath={AddButton}
        groupType={groupTypeEnum.button}
        defaultSchema={getRandomDefaultButtonSchema}
      />
    </>
  )
}

export default AddDrawer
