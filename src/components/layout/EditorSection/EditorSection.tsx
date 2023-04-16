import { Fragment, useContext } from 'react'
// import classNames from 'classnames'

// components
import RenderElement from '../../common/RenderElement'
import ButtonsControl from '../ButtonsControl'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

// utils
import getStyleSetting, { IStyleMapList } from '../../../utils/getStyleSetting'

const schemaStyleMapList: IStyleMapList = {
  general: 'relative transition-all duration-700',
  publish: 'px-2 md:px-4 lg:px-6',
  editor: {
    sm: 'w-mobile px-2',
    md: 'w-tablet px-4',
    lg: 'w-desktop px-6',
  },
}

function EditorSection() {
  const { schemas } = useContext(SchemaContext)
  const { previewMode, isEditorMode } = useContext(EditorInfoContext)
  const schemaStyleSetting = getStyleSetting(schemaStyleMapList, previewMode, isEditorMode)

  return (
    <>
      {schemas.map((schema, schemaIndex) => {
        if (!schema) return null

        return (
          <Fragment key={schema.uuid}>
            <div className={schemaStyleSetting}>
              <RenderElement schema={schema} schemaIndex={schemaIndex} />
              <ButtonsControl uuid={schema.uuid} />
            </div>
          </Fragment>
        )
      })}
    </>
  )
}

export default EditorSection
