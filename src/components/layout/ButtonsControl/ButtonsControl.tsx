// import { useContext } from "react"
import classNames from 'classnames'

// contexts
// import { SchemaContext } from '../../../contexts/SchemaContextSection'

function ButtonsControl() {
  // const { moveSchema, deleteSchema } = useContext(SchemaContext)

  return (
    <div
      className={classNames('absolute right-0 bottom-0 translate-x-[calc(100%+10px)] z-20 ', {
        // hidden: !isFocused,
      })}
    >
      <button
        className="rounded-button bg-main-blue mb-2"
        // onClick={() => moveSchema(schema.uuid, 'up')}
      >
        <i className="ri-arrow-up-s-line text-3xl text-white"></i>
      </button>
      <button
        className="rounded-button bg-main-blue mb-2"
        // onClick={() => moveSchema(schema.uuid, 'down')}
      >
        <i className="ri-arrow-down-s-line text-3xl text-white"></i>
      </button>
      {/* <button className="rounded-button bg-main-yellow" onClick={() => deleteSchema(schema.uuid)}> */}
      <i className="ri-close-line text-3xl text-white"></i>
      {/* </button> */}
    </div>
  )
}

export default ButtonsControl
