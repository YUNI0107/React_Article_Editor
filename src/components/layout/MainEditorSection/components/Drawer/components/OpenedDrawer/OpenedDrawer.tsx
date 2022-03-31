// components
import AddDrawer from '../../components/AddDrawer'
import InfoDrawer from '../../components/InfoDrawer'

// types
import { DrawerStateType } from '../../../../../../../types/layout'

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
