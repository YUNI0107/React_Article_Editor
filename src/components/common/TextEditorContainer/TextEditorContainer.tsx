import { useContext } from 'react'

// constants
import { containerWidth } from '../../../constants/enums/otherEnums'

// context
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function TextEditorContainer() {
  const { setIsPopupShow } = useContext(EditorInfoContext)

  return (
    <div
      className="bg-white rounded-lg overflow-hidden basic-shadow"
      style={{ width: `${containerWidth}px` }}
    >
      {/* header */}
      <div className="bg-main-blue w-full px-3 py-2 flex justify-between items-center cursor-move">
        <h1 className="text-base text-white font-bold">文字設定</h1>
        <button onClick={() => setIsPopupShow(false)}>
          <i className="ri-close-fill text-[28px] text-white hover:text-main-gray-300"></i>
        </button>
      </div>
      {/* bottom */}
      <div className="px-3 py-2">Text</div>
    </div>
  )
}

export default TextEditorContainer
