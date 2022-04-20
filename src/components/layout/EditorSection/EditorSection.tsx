import { Fragment, useContext } from 'react'

// components
import SingleFocusElement from '../../common/SingleFocusElement'

// types
import { SchemeContext } from '../../../contexts/SchemeContextSection'

function EditorSection() {
  const { schemes } = useContext(SchemeContext)

  return (
    <>
      {schemes.map((scheme) => {
        switch (scheme.groupType) {
          case 'banner':
          case 'button':
          case 'gallery':
            return (
              <Fragment key={scheme.uuid}>
                <SingleFocusElement scheme={scheme} />
              </Fragment>
            )
          case 'images':
            return <Fragment key={scheme.uuid}></Fragment>
          case 'paragraph':
            return <Fragment key={scheme.uuid}></Fragment>
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
