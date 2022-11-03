import { ReactNode, useEffect, useState, useContext } from 'react'
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
  setIsModalShow?: (isShow: boolean) => void
  isPopup?: boolean
}) {
  const [isVisible, setIsVisible] = useState(false)
  const { setIsPopupShow, isEditorMode, previewMode } = useContext(EditorInfoContext)

  useEffect(() => {
    if (isModalShow) {
      setIsVisible(true)
      setIsPopupShow(false)
    }
  }, [isModalShow, isVisible])

  if (!isVisible) return null

  return (
    <div
      className={classNames(
        'z-50 fixed top-0 left-0 w-screen flex justify-center items-center transition-opacity duration-500',
        {
          'opacity-0': !isModalShow,
        },
        isEditorMode && (previewMode === 'md' || previewMode === 'sm')
          ? 'h-[calc(100vh-80px)]'
          : 'h-screen'
      )}
      onTransitionEnd={() => setIsVisible(false)}
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
        <div className="relative z-20 shadow-lg">{children}</div>
      )}
    </div>
  )
}

export default ModalBackground
