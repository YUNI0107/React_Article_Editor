import classNames from 'classnames'

// components
import ControllerTitle from '../../components/ControllerTitle'

function FontStyleControl() {
  const selected = true
  return (
    <div className="py-2">
      <ControllerTitle />
      <div className="grid grid-cols-6 grid-rows-2">
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            selected ? 'text-main-blue' : 'text-main-gray-400'
          )}
        >
          <i className="ri-bold"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            selected ? 'text-main-blue' : 'text-main-gray-400'
          )}
        >
          <i className="ri-italic"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            selected ? 'text-main-blue' : 'text-main-gray-400'
          )}
        >
          <i className="ri-underline"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            selected ? 'text-main-blue' : 'text-main-gray-400'
          )}
        >
          <i className="ri-align-left"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            selected ? 'text-main-blue' : 'text-main-gray-400'
          )}
        >
          <i className="ri-align-center"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            selected ? 'text-main-blue' : 'text-main-gray-400'
          )}
        >
          <i className="ri-align-right"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            selected ? 'text-main-blue' : 'text-main-gray-400'
          )}
        >
          <i className="ri-list-ordered"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            selected ? 'text-main-blue' : 'text-main-gray-400'
          )}
        >
          <i className="ri-list-unordered"></i>
        </button>
      </div>
    </div>
  )
}

export default FontStyleControl
