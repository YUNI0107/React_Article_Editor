import { RefObject, useContext, useEffect, useRef, useState } from 'react'

// types
import { IUseScroll } from '../types/layout'

// contexts
import { EditorInfoContext } from '../contexts/EditorInfoContextSection'

function getScrollDirection({
  position,
  focusElementHeight,
  upperBounds = Infinity,
  lowerBounds = -Infinity,
}: {
  position: number | undefined
  focusElementHeight: number
  upperBounds: number | undefined
  lowerBounds: number | undefined
}): 'top' | 'bottom' | 'stable' {
  if (position === undefined) {
    return 'stable'
  }
  if (position > lowerBounds - focusElementHeight) {
    return 'bottom'
  }
  if (position < upperBounds + focusElementHeight) {
    return 'top'
  }
  return 'stable'
}

// reference example: https://github.com/react-dnd/react-dnd/issues/3482
export const useScroll = (ref: RefObject<HTMLDivElement | null>) => {
  const [config, setConfig] = useState<IUseScroll>({
    position: 0,
    isScrollAllowed: false,
  })

  const { focusElementHeight } = useContext(EditorInfoContext)

  const scrollTimer = useRef<number | null>(null)

  const scrollSpeed = 1
  const { position, isScrollAllowed } = config

  const bounds = ref?.current?.getBoundingClientRect()
  const direction = getScrollDirection({
    position,
    focusElementHeight,
    upperBounds: bounds?.top,
    lowerBounds: bounds?.bottom,
  })

  // effects
  useEffect(() => {
    if (direction !== 'stable' && isScrollAllowed) {
      scrollTimer.current = window.setInterval(() => {
        ref.current?.scrollBy(0, scrollSpeed * (direction === 'top' ? -1 : 1))
      }, 1)
    }
    return () => {
      if (scrollTimer.current) {
        window.clearInterval(scrollTimer.current)
      }
    }
  }, [isScrollAllowed, direction, ref, scrollSpeed])

  return { updatePosition: setConfig } as const
}
