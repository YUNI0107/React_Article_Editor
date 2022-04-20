// components
import AddDrawer from '../AddDrawer'
import InfoDrawer from '../InfoDrawer'

// types
import { DrawerStateType } from '../../../../../types/layout'

function OpenedDrawer({
  drawerState,
  setIsShow,
}: {
  drawerState: DrawerStateType
  setIsShow: (isShow: boolean) => void
}) {
  if (drawerState === 'add') {
    return <AddDrawer setIsShow={setIsShow} />
  } else {
    return <InfoDrawer setIsShow={setIsShow} />
  }
}

export default OpenedDrawer
