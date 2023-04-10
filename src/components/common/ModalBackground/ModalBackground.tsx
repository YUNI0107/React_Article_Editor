import { ReactNode, useEffect, useState, useContext, TransitionEvent } from 'react'
import classNames from 'classnames'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

// components
// import Popup from '../Popup'

function ModalBackground({
  children,
  isModalShow,
  setIsModalShow,
  isPopup = false,
}: {
  children: ReactNode
  isModalShow: boolean
  setIsModalShow?: (isShow: boolean, index?: number) => void
  isPopup?: boolean
}) {
  const [isVisible, setIsVisible] = useState(false)
  const { setIsPopupShow } = useContext(EditorInfoContext)

  // operation
  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target == event.currentTarget) {
      event.preventDefault()
      setIsVisible(false)
    }
  }

  useEffect(() => {
    if (isModalShow) {
      setIsVisible(true)
      setIsPopupShow(false)
    }
  }, [isModalShow])

  if (!isVisible) return null

  return (
    <div
      className={classNames(
        'z-50 fixed top-0 left-0 w-screen transition-opacity duration-500 h-screen',
        {
          'opacity-0': !isModalShow,
        }
      )}
      onTransitionEndCapture={handleTransitionEnd}
    >
      {/* background */}
      <div
        className="absolute top-0 left-0 z-10 w-full h-full backdrop-blur-sm bg-black/20"
        onClick={() => setIsModalShow && setIsModalShow(false)}
      ></div>

      {/* modal */}
      {isPopup ? (
        <>{/* <Popup>{children}</Popup> */}</>
      ) : (
        <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center px-2">
          {children}
        </div>
      )}
    </div>
  )
}

export default ModalBackground
