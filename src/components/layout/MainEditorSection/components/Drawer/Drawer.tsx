import { useState } from 'react'
import classNames from 'classnames'

function Drawer() {
  const [isShow, setIsShow] = useState(false)

  return (
    <div
      className={classNames('bg-white transition-all duration-700', {
        'w-[300px]': isShow,
        'w-[80px]': !isShow,
      })}
    >
      <button onClick={() => setIsShow(!isShow)}>Toogle</button>
    </div>
  )
}

export default Drawer
