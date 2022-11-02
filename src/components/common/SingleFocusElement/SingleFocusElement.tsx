import { useState } from 'react'

// components
import FocusElement from '../FocusElement'
import ModalBackground from '../ModalBackground'

// types
import { ISingleSchema } from '../../../types/editor'

function SingleFocusElement({
  schema,
  schemaIndex,
}: {
  schema: ISingleSchema
  schemaIndex: number
}) {
  const [isModalShow, setIsModalShow] = useState(false)

  return (
    <>
      <FocusElement schema={schema} schemaIndex={schemaIndex} id={schema.uuid} key={schema.uuid} />
      <h1 onClick={() => setIsModalShow(true)}>click</h1>

      <ModalBackground isModalShow={isModalShow}>
        {schema.groupType === 'banner' && (
          <div className="bg-white p-10">
            <div onClick={() => setIsModalShow(false)}>Close</div>
            中間
          </div>
        )}
      </ModalBackground>
    </>
  )
}

export default SingleFocusElement
