import { controlContainerWidth } from '../constants/enums/otherEnums'

function getElementPosition(element: HTMLElement | null) {
  const bindRect = element?.getBoundingClientRect()

  if (!bindRect) {
    return {
      top: 0,
      left: 0,
    }
  }

  const originalLeft = bindRect.left + bindRect.width
  const originalTop = window.scrollY + bindRect.top
  const headerHeight = 80
  const padding = 20

  const left =
    originalLeft > window.innerWidth - controlContainerWidth
      ? window.innerWidth - controlContainerWidth - padding
      : originalLeft + padding
  const top = originalTop > headerHeight + padding ? originalTop : headerHeight + padding

  console.log(top)

  return {
    top,
    left,
  }
}

export default getElementPosition
