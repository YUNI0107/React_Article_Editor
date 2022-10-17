import { Fragment, useMemo } from 'react'
import classNames from 'classnames'

// types
import { IImages } from '../../../types/editor'

// images
import DefaultImage from '../../../assets/default.png'

function ImagesComponent({
  schema,
  PopupShowHandler,
  isButtonShow,
}: {
  schema: IImages
  PopupShowHandler: () => void
  isButtonShow: boolean
  isPopupShow: boolean
  setIsPopupShow: (isShow: boolean) => void
}) {
  if (!schema) return null

  const { type, children } = schema
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
        const { props } = children[index] || {}

        return (
          <Fragment key={index}>
            <div className="flex flex-col">
              <div>
                <img src={props?.imgPath || DefaultImage} alt="images" />
              </div>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}

export default ImagesComponent
