import { useContext } from 'react'

// utils
import ControlHandler from '../../../utils/controlHandler'

// contexts
import { SchemeContext } from '../../../contexts/SchemeContextSection'

// components
import ControlTitle from '../components/ControlTitle'

function ImgFilterControl({ uuid, childUuid }: { uuid: string; childUuid?: string }) {
  const { schemes, handleScheme } = useContext(SchemeContext)
  const controlHandler = new ControlHandler('filter', schemes, handleScheme)

  const changeFilterValue = async (filterStyle: 'back') => {
    const filterClassName = filterStyle && 'grayscale'
    controlHandler.changeValue(filterClassName, uuid, childUuid)
  }

  return (
    <div>
      <ControlTitle />
      <button onClick={() => changeFilterValue('back')}>黑白</button>
    </div>
  )
}

export default ImgFilterControl
