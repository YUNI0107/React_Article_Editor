import { useState, useEffect, ReactNode, useContext } from 'react'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function PopUp({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const { distance, isPopupShow, setIsPopupShow } = useContext(EditorInfoContext)
  const { top, left } = distance

  const transitionEnd = (isVisible: boolean) => {
    if (!isVisible) setIsPopupShow(false)
  }

  // effects
  useEffect(() => {
    if (isPopupShow) setIsVisible(true)
  }, [isPopupShow])

  return (
    <>
      {isPopupShow && (
        <div
          className="absolute z-20"
          onTransitionEnd={() => transitionEnd(isVisible)}
          style={{ top: `${top}px`, left: `${left}px` }}
        >
          {/* popup */}
          {children}
        </div>
      )}
    </>
  )
}

export default PopUp
