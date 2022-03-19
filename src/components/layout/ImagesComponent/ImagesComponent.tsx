import { Fragment, useMemo } from 'react'

// components
import ImagesControlSection from './ImagesControlSection'

// types
import { IImages } from '../../../types/editor'

// images
import DefaultImage from '../../../assets/default.png'

function ImagesComponent({ scheme }: { scheme: IImages }) {
  if (!scheme) return null

  const { type, props, controls, childrenParagraph } = scheme

  console.log(props, controls, childrenParagraph)

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
      {imagesCountArray.map((_, index) => {
        return (
          <Fragment key={index}>
            <div className="flex flex-col">
              <div>
                <img src={props?.imgPaths?.[index] || DefaultImage} alt="images" />
              </div>

              <div>
                <h1>wwwww</h1>
                <p>eeeee</p>
              </div>
            </div>

            <ImagesControlSection controls={controls} props={props} order={index} />
          </Fragment>
        )
      })}
    </div>
  )
}

export default ImagesComponent
