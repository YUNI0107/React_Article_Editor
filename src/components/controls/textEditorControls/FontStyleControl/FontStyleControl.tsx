import { useContext } from 'react'
import classNames from 'classnames'

// contexts
import { TextPopupContext } from '../../../../contexts/TextPopupContextSection/TextPopupContextSection'

// components
import ControllerTitle from '../../components/ControllerTitle'

function FontStyleControl() {
  const { styleSelected, setNeedUpdate } = useContext(TextPopupContext)
  const {
    bold,
    italic,
    underline,
    alignLeft,
    alignCenter,
    alignRight,
    listOrdered,
    listUnOrdered,
  } = styleSelected

  return (
    <div className="py-2">
      <ControllerTitle />
      <div className="grid grid-cols-6 grid-rows-2">
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            bold ? 'text-main-blue' : 'text-main-gray-400'
          )}
          onClick={() => setNeedUpdate({ bold: !bold })}
        >
          <i className="ri-bold"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            italic ? 'text-main-blue' : 'text-main-gray-400'
          )}
          onClick={() => setNeedUpdate({ italic: !italic })}
        >
          <i className="ri-italic"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            underline ? 'text-main-blue' : 'text-main-gray-400'
          )}
          onClick={() => setNeedUpdate({ underline: !underline })}
        >
          <i className="ri-underline"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            alignLeft ? 'text-main-blue' : 'text-main-gray-400'
          )}
          onClick={() => setNeedUpdate({ alignLeft: !alignLeft })}
        >
          <i className="ri-align-left"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            alignCenter ? 'text-main-blue' : 'text-main-gray-400'
          )}
          onClick={() => setNeedUpdate({ alignCenter: !alignCenter })}
        >
          <i className="ri-align-center"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            alignRight ? 'text-main-blue' : 'text-main-gray-400'
          )}
          onClick={() => setNeedUpdate({ alignRight: !alignRight })}
        >
          <i className="ri-align-right"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            listOrdered ? 'text-main-blue' : 'text-main-gray-400'
          )}
          onClick={() => setNeedUpdate({ listOrdered: !listOrdered })}
        >
          <i className="ri-list-ordered"></i>
        </button>
        <button
          className={classNames(
            'text-xl  hover:text-main-blue p-1',
            listUnOrdered ? 'text-main-blue' : 'text-main-gray-400'
          )}
          onClick={() => setNeedUpdate({ listUnOrdered: !listUnOrdered })}
        >
          <i className="ri-list-unordered"></i>
        </button>
      </div>
    </div>
  )
}

export default FontStyleControl
