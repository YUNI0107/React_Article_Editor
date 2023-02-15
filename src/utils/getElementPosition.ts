import { containerWidth } from '../constants/enums/otherEnums'

function getElementPosition(element: HTMLElement | null) {
  const bindRect = element?.getBoundingClientRect()

  if (!bindRect) {
    return {
      top: 0,
      left: 0,
    }
  }

  const headerHeight = 80
  const padding = 20
  const containerPadding = 24
  const originalLeft = bindRect.left + bindRect.width
  const originalTop = window.scrollY + bindRect.top - (headerHeight + padding) + containerPadding

  const left =
    originalLeft > window.innerWidth - containerWidth
      ? window.innerWidth - containerWidth - padding
      : originalLeft + padding
  const top = originalTop > 0 ? originalTop : 0

  return {
    top,
    left,
  }
}

export default getElementPosition
