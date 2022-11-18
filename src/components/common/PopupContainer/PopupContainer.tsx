import { ReactNode, useContext } from 'react'
import { ConnectDragSource } from 'react-dnd'

// constants
import { containerWidth } from '../../../constants/enums/otherEnums'

// context
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function PopupContainer({
  title,
  children,
  drag,
}: {
  title: string
  children: ReactNode
  drag: ConnectDragSource
}) {
  const { setIsPopupShow } = useContext(EditorInfoContext)

  return (
    <div className="bg-white rounded-lg basic-shadow" style={{ width: `${containerWidth}px` }}>
      {/* header */}
      <div
        ref={drag}
        className="bg-main-blue w-full px-3 py-2 flex justify-between items-center cursor-move rounded-t-lg"
      >
        <h1 className="text-base text-white font-bold">{title}</h1>
        <button onClick={() => setIsPopupShow(false)}>
          <i className="ri-close-fill text-[28px] text-white hover:text-main-gray-300"></i>
        </button>
      </div>
      {/* bottom */}
      <div className="px-3 py-2">{children}</div>
    </div>
  )
}

export default PopupContainer
