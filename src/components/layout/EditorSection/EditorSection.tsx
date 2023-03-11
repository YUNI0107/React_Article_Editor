import { Fragment, useContext } from 'react'
import classNames from 'classnames'

// components
import RenderElement from '../../common/RenderElement'
import ButtonsControl from '../ButtonsControl'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function EditorSection() {
  const { schemas } = useContext(SchemaContext)
  const { previewMode } = useContext(EditorInfoContext)
  const schemaStyleSetting = classNames('relative px-2 transition-all duration-700', {
    'w-mobile': previewMode === 'sm',
    'w-tablet': previewMode === 'md',
    'w-desktop': previewMode === 'lg',
  })

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
