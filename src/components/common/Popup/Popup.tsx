import { useState, useEffect, ReactNode } from 'react'

function PopUp({
  children,
  isPopupShow,
  setIsPopupShow,
  distance,
}: {
  children: ReactNode
  isPopupShow: boolean
  setIsPopupShow: (isPopupShow: boolean) => void
  distance: { top: number; left: number }
}) {
  const [isVisible, setIsVisible] = useState(false)
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
          className="absolute z-[100]"
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
