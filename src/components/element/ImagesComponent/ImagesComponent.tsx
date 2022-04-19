import { Fragment, useMemo } from 'react'

// components
import ImagesControlSection from './components/ImagesControlSection'
import PopUp from '../../common/Popup'

// types
import { IImages } from '../../../types/editor'

// images
import DefaultImage from '../../../assets/default.png'
import classNames from 'classnames'

function ImagesComponent({
  scheme,
  PopupShowHandler,
  isButtonShow,
  isPopupShow,
  setIsPopupShow,
  distance,
}: {
  scheme: IImages
  PopupShowHandler: () => void
  isButtonShow: boolean
  isPopupShow: boolean
  setIsPopupShow: (isShow: boolean) => void
  distance: { top: number; left: number }
}) {
  if (!scheme) return null

  const { type, uuid, children } = scheme
  const buttonStyle = isButtonShow ? 'block pointer-events-auto' : 'hidden pointer-events-none'

  const imagesCountArray = useMemo(() => {
    let count

    switch (type) {
      case 'triplicate-square':
      case 'triplicate-circle':
      case 'triplicate-rectangle':
        count = 3
        break
      case 'double-square':
      case 'double-circle':
      case 'double-rectangle':
        count = 2
        break
      default:
        count = 0
    }

    return Array.from({ length: count })
  }, [])

  return (
    <div>
      <div onClick={PopupShowHandler} className={classNames(buttonStyle)}>
        編輯
      </div>
      {imagesCountArray.map((_, index) => {
        const { props, controls } = children[index] || {}

        return (
          <Fragment key={index}>
            <div className="flex flex-col">
              <div>
                <img src={props?.imgPath || DefaultImage} alt="images" />
              </div>
            </div>

            {/* controller container popup */}
            <PopUp isPopupShow={isPopupShow} setIsPopupShow={setIsPopupShow} distance={distance}>
              <div className="bg-pink-300">
                <ImagesControlSection controls={controls} props={props} order={index} uuid={uuid} />
              </div>
            </PopUp>
          </Fragment>
        )
      })}
    </div>
  )
}

export default ImagesComponent
