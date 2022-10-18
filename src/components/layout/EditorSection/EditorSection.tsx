import { Fragment, useContext } from 'react'
import classNames from 'classnames'

// components
import SingleFocusElement from '../../common/SingleFocusElement'
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
      {schemas.map((schema) => {
        switch (schema.groupType) {
          case 'banner':
          case 'button':
          case 'gallery':
            return (
              <Fragment key={schema.uuid}>
                <div className={schemaStyleSetting}>
                  <SingleFocusElement schema={schema} />
                  <ButtonsControl uuid={schema.uuid} />
                </div>
              </Fragment>
            )
          case 'images':
            return <Fragment key={schema.uuid}></Fragment>
          case 'paragraph':
            return <Fragment key={schema.uuid}></Fragment>
          default:
            return (
              <Fragment key={'error-display'}>
                <p>Error display</p>
              </Fragment>
            )
        }
      })}
    </>
  )
}

export default EditorSection
