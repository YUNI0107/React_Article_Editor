const getSelectionPosition = (elementRect?: DOMRect) => {
  const selection = window.getSelection()
  const range = selection?.getRangeAt(0)

  if (range) {
    const rect = range.getBoundingClientRect()

    if (elementRect) {
      return { top: rect.top - elementRect.top, left: rect.left - elementRect.left }
    } else {
      return { top: rect.top, left: rect.left }
    }
  }
}

export default getSelectionPosition
