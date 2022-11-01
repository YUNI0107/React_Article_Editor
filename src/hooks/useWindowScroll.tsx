import { useEffect, useRef, useState } from 'react'

function getScrollDirection(position: number | null): 'top' | 'bottom' | 'stable' {
  const windowHeight = window.innerHeight
  const topLimit = windowHeight - (windowHeight / 3) * 2
  const bottomLimit = windowHeight - windowHeight / 3

  if (position === null) {
    return 'stable'
  }

  if (position > topLimit) {
    return 'bottom'
  }
  if (position < bottomLimit) {
    return 'top'
  }

  return 'stable'
}

export const useWindowScroll = (isDragging: boolean, previewMode: 'lg' | 'md' | 'sm') => {
  const [position, setPosition] = useState<number | null>(null)
  const scrollTimer = useRef<number | null>(null)
  const direction = getScrollDirection(position)
  const scrollSpeed = 5

  // operation
  const handleWindowMouseMove = (event: DragEvent) => {
    setPosition(event.clientY)
  }

  useEffect(() => {
    if (direction !== 'stable' && isDragging && previewMode === 'lg') {
      scrollTimer.current = window.setInterval(() => {
        window.scrollBy(0, scrollSpeed * (direction === 'top' ? -1 : 1))
      }, 1)
    }

    return () => {
      if (scrollTimer.current) {
        window.clearInterval(scrollTimer.current)
      }
    }
  }, [direction, isDragging, previewMode])

  useEffect(() => {
    window.addEventListener('drag', handleWindowMouseMove)
    return () => window.removeEventListener('drag', handleWindowMouseMove)
  }, [])
}
