import { useState, useEffect, ReactNode, useContext } from 'react'
import { ConnectDragPreview } from 'react-dnd'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function PopUp({
  children,
  popupDistance,
  isDragging,
  preview,
}: {
  children: ReactNode
  popupDistance: { top: number; left: number }
  isDragging: boolean
  preview: ConnectDragPreview
}) {
  const [isVisible, setIsVisible] = useState(false)
  const { isPopupShow, setIsPopupShow } = useContext(EditorInfoContext)
  const { top, left } = popupDistance

  // operation
  const transitionEnd = (isVisible: boolean) => {
    if (!isVisible) setIsPopupShow(false)
  }

  // effects
  useEffect(() => {
    if (isPopupShow) setIsVisible(true)
  }, [isPopupShow])

  if (!isPopupShow) return null

  if (isDragging) {
    return <div ref={preview}></div>
  }

  return (
    <div
      ref={preview}
      className="absolute z-20 transition-all duration-300"
      onTransitionEnd={() => transitionEnd(isVisible)}
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      {/* popup */}
      {children}
    </div>
  )
}

export default PopUp
