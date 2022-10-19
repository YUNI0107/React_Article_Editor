import { useState, useEffect, ReactNode, useContext } from 'react'
import { useDrag } from 'react-dnd'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function PopUp({
  children,
  popupDistance,
}: {
  children: ReactNode
  popupDistance: { top: number; left: number }
}) {
  const [isVisible, setIsVisible] = useState(false)
  const { isPopupShow, setIsPopupShow } = useContext(EditorInfoContext)
  const { top, left } = popupDistance

  // operation
  const transitionEnd = (isVisible: boolean) => {
    if (!isVisible) setIsPopupShow(false)
  }

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'popup',
      item: { left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [left, top]
  )

  // effects
  useEffect(() => {
    if (isPopupShow) setIsVisible(true)
  }, [isPopupShow])

  if (!isPopupShow) return null

  if (isDragging) {
    return <div ref={drag} />
  }

  return (
    <div
      ref={drag}
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
