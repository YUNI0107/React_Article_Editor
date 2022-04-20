function getElementPosition(element: HTMLElement | null) {
  const bindRect = element?.getBoundingClientRect()
  return {
    top: bindRect?.top || 0,
    left: bindRect?.left || 0,
  }
}

export default getElementPosition
