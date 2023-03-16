import { useState } from 'react'
import classNames from 'classnames'

// types
import { DrawerStateType } from '../../../types/layout'

// components
import OpenedDrawer from './components/OpenedDrawer'

function Drawer() {
  const [isShow, setIsShow] = useState(false)
  const [drawerState, setDrawerState] = useState<DrawerStateType>('add')

  //   components

  //   operation
  const handleDrawerShow = (state: DrawerStateType) => {
    setIsShow(true)
    setDrawerState(state)
  }

  return (
    <div
      className={classNames(
        'fixed z-30 flex flex-col bg-white transition-all duration-700 h-[calc(100%-80px)] basic-shadow overflow-y-auto overflow-x-hidden',
        {
          'w-[300px]': isShow,
          'w-[80px]': !isShow,
        }
      )}
    >
      <div className="flex-1">
        {isShow ? (
          <div className="min-w-[300px] px-4 pt-8">
            <OpenedDrawer setIsShow={setIsShow} drawerState={drawerState} />
          </div>
        ) : (
          <div className="flex flex-col h-full justify-center items-center">
            <button
              className="group square-button rounded-full mb-3"
              onClick={() => handleDrawerShow('add')}
            >
              <i className="ri-add-fill transition duration-700 group-hover:rotate-90"></i>
            </button>
            <button
              className="group square-button rounded-full"
              onClick={() => handleDrawerShow('info')}
            >
              <i className="ri-settings-3-fill text-3xl transition duration-700 group-hover:rotate-90"></i>
            </button>
          </div>
        )}
      </div>

      <div className="px-4 pb-8">
        <a target="_blank" href="https://github.com/YUNI0107" rel="noreferrer">
          <i className="ri-github-fill text-4xl text-main-gray-300 mx-2"></i>
        </a>
      </div>
    </div>
  )
}

export default Drawer
