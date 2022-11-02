import classNames from 'classnames'
import { ReactNode, useEffect, useState } from 'react'

// components
// import Popup from '../Popup'

function ModalBackground({
  children,
  isModalShow,
  isPopup = false,
}: {
  children: ReactNode
  isModalShow: boolean
  isPopup?: boolean
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isModalShow) setIsVisible(true)
  }, [isModalShow])

  if (!isVisible) return null

  return (
    <div
      className={classNames(
        'z-50 fixed top-0 left-0 w-screen h-screen flex justify-center items-center transition-all duration-500',
        { 'opacity-0': !isModalShow }
      )}
      onTransitionEnd={() => setIsVisible(false)}
    >
      {/* background */}
      <div
        className={'absolute top-0 left-0 z-10 w-full h-full backdrop-blur-sm bg-black/10'}
      ></div>

      {/* modal */}
      {isPopup ? (
        <>{/* <Popup>{children}</Popup> */}</>
      ) : (
        <div className="relative z-20 shadow-lg">{children}</div>
      )}
    </div>
  )
}

export default ModalBackground
