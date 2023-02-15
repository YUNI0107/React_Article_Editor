const COLOR_LIST = ['#3742FA', '#FFA502', '#70A1FF', '#b900e2', '#21ffd6']

function getRandomColor() {
  const index = Math.floor(Math.random() * 5)
  return COLOR_LIST[index]
}

export default getRandomColor
