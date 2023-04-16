// types
import { useEffect, useState, useMemo } from 'react'
import { IGalleryImage } from '../../../../../types/editor'
import { PreviewModesType } from '../../../../../types/layout'

// utils
import getStyleSetting, { IStyleMapList } from '../../../../../utils/getStyleSetting'

const styleMapList: IStyleMapList = {
  general: 'grid',
  publish: 'grid-cols-2 gap-1 md:grid-cols-3 md:gap-2',
  editor: { sm: 'grid-cols-2 gap-1', md: 'grid-cols-3 gap-2', lg: 'grid-cols-3 gap-2' },
}

function NineSquareGallery({
  images,
  handleModalShow,
  previewMode,
  isEditorMode,
}: {
  images: Array<IGalleryImage>
  handleModalShow: (index: number) => void
  previewMode: PreviewModesType
  isEditorMode: boolean
}) {
  const defaultInitCount = useMemo(() => {
    if (isEditorMode) {
      return previewMode === 'sm' ? 8 : 9
    } else {
      return window.matchMedia('(max-width: 768px)').matches ? 8 : 9
    }
  }, [previewMode])

  const [imagesCount, setImagesCount] = useState(defaultInitCount)
  const styleSetting = getStyleSetting(styleMapList, previewMode, isEditorMode)

  // operations
  const handleTabletChange = (e: MediaQueryListEvent) => {
    setImagesCount(e.matches ? 8 : 9)
  }

  // For PublishMode calculate image count
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    if (!isEditorMode) {
      try {
        // Chrome & Firefox
        mediaQuery.addEventListener('change', handleTabletChange)
      } catch (error) {
        try {
          // Safari
          mediaQuery.addListener(handleTabletChange)
        } catch (error2) {
          console.error(error2)
        }
      }
    }

    return () => {
      if (isEditorMode) {
        try {
          // Chrome & Firefox
          mediaQuery.removeEventListener('change', handleTabletChange)
        } catch (error) {
          try {
            // Safari
            mediaQuery.removeListener(handleTabletChange)
          } catch (error2) {
            console.error(error2)
          }
        }
      }
    }
  }, [])

  // For EditorMode calculate image count
  useEffect(() => {
    if (isEditorMode) {
      if (previewMode === 'sm') {
        setImagesCount(8)
      } else {
        setImagesCount(9)
      }
    }
  }, [previewMode])

  return (
    <>
      <div className={styleSetting}>
        {images.slice(0, imagesCount).map((image, index) => {
          return (
            <div
              key={index}
              className="relative w-full pb-[100%] overflow-hidden"
              onClick={() => handleModalShow(index)}
            >
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={image.imgPath}
              />
            </div>
          )
        })}
      </div>

      {images.length > 9 && (
        <div className="flex w-full justify-end">
          <p className="font-bold mt-2" onClick={() => handleModalShow(9)}>
            查看更多 &gt;
          </p>
        </div>
      )}
    </>
  )
}

export default NineSquareGallery
