import { useContext } from 'react'
import classNames from 'classnames'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

function ButtonsControl({ uuid }: { uuid: string }) {
  const { moveSchema, deleteSchema } = useContext(SchemaContext)
  const { focusElementSchema, isPopupShow, setIsPopupShow } = useContext(EditorInfoContext)

  const handleDeleteSchema = (uuid: string) => {
    if (focusElementSchema?.uuid === uuid && isPopupShow) {
      setIsPopupShow(false)
    }

    deleteSchema(uuid)
  }

  return (
    <div
      className={classNames('absolute right-0 bottom-0 translate-x-[calc(100%+10px)] z-20 ', {
        hidden: focusElementSchema?.uuid !== uuid,
      })}
    >
      <button className="rounded-button bg-main-blue mb-2" onClick={() => moveSchema(uuid, 'up')}>
        <i className="ri-arrow-up-s-line text-3xl text-white"></i>
      </button>
      <button className="rounded-button bg-main-blue mb-2" onClick={() => moveSchema(uuid, 'down')}>
        <i className="ri-arrow-down-s-line text-3xl text-white"></i>
      </button>
      <button className="rounded-button bg-main-yellow" onClick={() => handleDeleteSchema(uuid)}>
        <i className="ri-close-line text-3xl text-white"></i>
      </button>
    </div>
  )
}

export default ButtonsControl
