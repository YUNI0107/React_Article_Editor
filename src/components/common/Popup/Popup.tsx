import { ReactNode } from 'react'
import { ConnectDragPreview } from 'react-dnd'

function PopUp({
  children,
  isPopupShow,
  popupDistance,
  isDragging,
  preview,
}: {
  children: ReactNode
  isPopupShow: boolean
  popupDistance: { top: number; left: number }
  isDragging: boolean
  preview: ConnectDragPreview
}) {
  const { top, left } = popupDistance

  if (!isPopupShow) return null

  if (isDragging) {
    return <div ref={preview}></div>
  }

  return (
    <div
      ref={preview}
      className="absolute z-20 transition-all duration-300"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      {/* popup */}
      {children}
    </div>
  )
}

export default PopUp
