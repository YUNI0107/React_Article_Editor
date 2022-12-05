const getSelectionPosition = () => {
  const selection = window.getSelection()
  const range = selection?.getRangeAt(0)

  if (range) {
    const rect = range.getBoundingClientRect()
    console.log('rect', rect)
    return { top: window.scrollY + rect.top, left: window.scrollX + rect.left }
  }
}

export default getSelectionPosition
