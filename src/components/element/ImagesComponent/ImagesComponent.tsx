import { useMemo } from 'react'
import classNames from 'classnames'

// types
import { IImages } from '../../../types/editor'

// images
import ImageComponent from './ImageComponent'

function ImagesComponent({
  schema,
  popupShowHandler,
  isButtonShow,
  isEditorMode,
  setIsModalShow,
}: {
  schema: IImages
  popupShowHandler: (index: number | null) => void
  isButtonShow: boolean
  isEditorMode: boolean
  setIsModalShow?: (isShow: boolean, index?: number) => void
}) {
  if (!schema) return null

  const { children, type } = schema
  const buttonStyle = isButtonShow ? 'block pointer-events-auto' : 'hidden pointer-events-none'

  const gridColsClassName = useMemo(() => {
    switch (type) {
      case 'triplicate-square':
      case 'triplicate-circle':
      case 'triplicate-rectangle':
        return 'grid-cols-3'
      case 'double-square':
      case 'double-circle':
      case 'double-rectangle':
        return 'grid-cols-2'
      default:
        return 'grid-cols-1'
    }
  }, [])

  return (
    <>
      <div className={classNames('grid gap-x-2', gridColsClassName)}>
        {children.map((child, index) => {
          return (
            <ImageComponent
              type={type}
              key={index}
              schema={child}
              parentSchema={schema}
              popupShowHandler={() => popupShowHandler(index)}
              isEditorMode={isEditorMode}
              setIsModalShow={(isShow) => setIsModalShow && setIsModalShow(isShow, index)}
            />
          )
        })}
      </div>
      <div onClick={() => popupShowHandler(null)} className={classNames(buttonStyle)}>
        編輯
      </div>
    </>
  )
}

export default ImagesComponent
