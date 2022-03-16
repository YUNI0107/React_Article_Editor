import { useMemo } from 'react'

// types
import { IImages } from '../../../types/editor'

function ImagesComponent({ scheme }: { scheme: IImages }) {
  const { type, props, control, childrenParagraph } = scheme

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

    return new Array(count)
  }, [])

  return (
    <div>
      {imagesCountArray.map((_, index) => {
        return <div key={index}>img</div>
      })}
    </div>
  )
}

export default ImagesComponent
