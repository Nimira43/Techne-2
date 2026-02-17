const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const regenerateBtn = document.getElementById('regenerateBtn')

const size = 700
canvas.height = size
canvas.width = size
ctx.lineCap = 'round'
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
ctx.shadowBlur = 10
ctx.shadowOffsetX = 3
ctx.shadowOffsetY = 3

function drawFractal() {
  const lineWidth = Math.floor(Math.random() * 11) + 4
  const hue = Math.random() * 360
  const sides = Math.floor(Math.random() * 6) + 2
  const maxLevel = 5
  const spread = Math.random() * 0.5 + 0.4
  const scale = Math.random() * 0.1 + 0.7
  const branches = 4
  
  ctx.clearRect(0, 0, size, size)
  ctx.lineWidth = lineWidth
  ctx.save()
  ctx.translate(size / 2, size / 2)

  for (let i = 0; i < sides; i++) {
    drawBranch(0, maxLevel, spread, scale, branches, hue)
    ctx.rotate(Math.PI * 2 / sides)
  }
  ctx.restore()
}
  
function drawBranch(level, maxLevel, spread, scale, branches, hue) {
  if (level > maxLevel) return
  const branchSize = 110
  const lightness = 10 + level * 10
  ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(branchSize, 0)
  ctx.stroke()

  for (let i = 0; i < branches; i++) {
    const position = branchSize - (branchSize / branches) * i
    ctx.save()
    ctx.translate(position, 0)
    ctx.scale(scale, scale)
    ctx.rotate(spread * 2.1 * i / branches - spread * 0.95)
    drawBranch(level + 1, maxLevel, spread, scale, branches, hue)
    ctx.restore()
  }
}

drawFractal()
regenerateBtn.addEventListener('click', drawFractal)