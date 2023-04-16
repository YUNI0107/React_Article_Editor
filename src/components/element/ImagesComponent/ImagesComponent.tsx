import { useEffect, useContext } from 'react'
import classNames from 'classnames'

// types
import { IImages } from '../../../types/editor'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

// components
import ImageComponent from './ImageComponent'
import IconRectangleButton from '../../common/IconRectangleButton/IconRectangleButton'

// utils
import getStyleSetting, { IStyleMapList } from '../../../utils/getStyleSetting'

const styleMapList: IStyleMapList = {
  general: 'grid gap-x-2',
  editor: {},
}

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
  const { previewMode } = useContext(EditorInfoContext)
  const styleSetting = getStyleSetting(styleMapList, previewMode, isEditorMode)

  useEffect(() => {
    if (!styleMapList.editor) return

    switch (type) {
      case 'triplicate-square':
      case 'triplicate-circle':
      case 'triplicate-rectangle':
        styleMapList.editor.lg = 'grid-cols-3'
        styleMapList.editor.md = 'grid-cols-3'
        styleMapList.editor.sm = 'grid-cols-1'
        styleMapList.publish = 'grid-cols-1 md:grid-cols-3'
        break
      case 'double-square':
      case 'double-circle':
      case 'double-rectangle':
        styleMapList.editor.lg = 'grid-cols-2'
        styleMapList.editor.md = 'grid-cols-2'
        styleMapList.editor.sm = 'grid-cols-1'
        styleMapList.publish = 'grid-cols-1 md:grid-cols-2'
        break
      default:
        break
    }
  }, [type])

  return (
    <>
      <div className={styleSetting}>
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

      <div className="w-full">
        <IconRectangleButton
          icon="ri-edit-2-fill"
          onClick={() => popupShowHandler(null)}
          text="編輯群組"
          customClassNames={classNames(buttonStyle, 'my-5 mx-auto')}
        />
      </div>
    </>
  )
}

export default ImagesComponent
