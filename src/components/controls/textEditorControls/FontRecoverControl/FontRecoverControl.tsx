import { useContext } from 'react'

// components
import ControllerTitle from '../../components/ControllerTitle'

// contexts
import { TextPopupContext } from '../../../../contexts/TextPopupContextSection/TextPopupContextSection'

function FontRecoverControl() {
  const { setNeedUpdate } = useContext(TextPopupContext)

  // operation
  const handleClick = () => {
    setNeedUpdate({ reset: true })
  }
  return (
    <div className="py-2">
      <ControllerTitle />
      <button
        className="w-full  rounded-full bg-main-blue py-1 px-2 text-white flex justify-center items-center hover:brightness-90"
        onClick={handleClick}
      >
        <i className="ri-refresh-line font-bold mr-1"></i>
        <span className="text-[10px]">回歸預設樣式</span>
      </button>
    </div>
  )
}

export default FontRecoverControl
