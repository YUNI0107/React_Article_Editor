import { useState, useMemo, useContext } from 'react'

// components
import FocusElement from '../FocusElement'
import ModalBackground from '../ModalBackground'

// components - modals
import BasicImageModal from '../BasicImageModal'

// types
import { IComponentSchema } from '../../../types/editor'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function RenderElement({ schema, schemaIndex }: { schema: IComponentSchema; schemaIndex: number }) {
  const [isModalShow, setIsModalShow] = useState(false)
  const { popupChildrenIndex, setPopupChildrenIndex } = useContext(EditorInfoContext)

  const imgPath = useMemo(() => {
    if (popupChildrenIndex !== null && 'children' in schema) {
      return schema.children[popupChildrenIndex].props?.imgPath
    } else {
      return schema.props?.imgPath
    }
  }, [schema, popupChildrenIndex])

  // operations
  const handleModalClose = () => {
    setIsModalShow(false)
  }

  const handleModalShow = (isShow: boolean, index?: number) => {
    setIsModalShow(isShow)
    setPopupChildrenIndex(index !== undefined ? index : null)
  }

  return (
    <>
      <FocusElement
        schema={schema}
        schemaIndex={schemaIndex}
        id={schema.uuid}
        key={schema.uuid}
        setIsModalShow={handleModalShow}
      />

      <ModalBackground isModalShow={isModalShow} setIsModalShow={setIsModalShow}>
        {(schema.groupType === 'banner' || schema.groupType === 'images') && (
          <BasicImageModal imgPath={imgPath} handleModalClose={handleModalClose} />
        )}
      </ModalBackground>
    </>
  )
}

export default RenderElement
