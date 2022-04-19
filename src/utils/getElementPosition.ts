function getElementPosition(element: HTMLElement | null) {
  return {
    x: element?.offsetTop || 0,
    y: element?.offsetLeft || 0,
  }
}

export default getElementPosition
