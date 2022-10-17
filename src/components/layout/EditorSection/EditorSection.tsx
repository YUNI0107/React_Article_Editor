import { Fragment, useContext } from 'react'

// components
import SingleFocusElement from '../../common/SingleFocusElement'

// types
import { SchemaContext } from '../../../contexts/SchemaContextSection'

function EditorSection() {
  const { schemas } = useContext(SchemaContext)

  return (
    <>
      {schemas.map((schema) => {
        switch (schema.groupType) {
          case 'banner':
          case 'button':
          case 'gallery':
            return (
              <Fragment key={schema.uuid}>
                <SingleFocusElement schema={schema} />
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
