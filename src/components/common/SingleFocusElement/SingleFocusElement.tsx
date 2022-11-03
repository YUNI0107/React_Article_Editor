import { useState } from 'react'

// components
import FocusElement from '../FocusElement'
import ModalBackground from '../ModalBackground'

// components - modals
import BasicImageModal from '../BasicImageModal'

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

  // operations
  const handleModalClose = () => {
    setIsModalShow(false)
  }

  return (
    <>
      <FocusElement schema={schema} schemaIndex={schemaIndex} id={schema.uuid} key={schema.uuid} />
      <h1 onClick={() => setIsModalShow(true)}>click</h1>

      <ModalBackground isModalShow={isModalShow} setIsModalShow={setIsModalShow}>
        {schema.groupType === 'banner' && (
          <BasicImageModal imgPath={schema?.props?.imgPath} handleModalClose={handleModalClose} />
        )}
      </ModalBackground>
    </>
  )
}

export default SingleFocusElement
