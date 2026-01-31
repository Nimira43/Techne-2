const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const regenerateBtn = document.getElementById('regenerateBtn')

const size = 600
canvas.height = size
canvas.width = size
ctx.strokeStyle = '#ffd700'
ctx.lineWidth = 10

function drawFractal() {
  const sides = 5
  const maxLevel = 7
  const spread = Math.random() * 2 -0.5
  
  ctx.save()
  ctx.translate(size / 2, size / 2)

  for (let i = 0; i < sides; i++) {
    drawBranch(0, maxLevel, spread)
    ctx.rotate(Math.PI * 2 / sides)
  }
  ctx.restore()
}
  
function drawBranch(level, maxLevel, spread) {
  if (level > maxLevel) return

  const branchSize = 100
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(branchSize, 0)
  ctx.stroke()

  for (let i = 0; i < 1; i++) {
    ctx.save()
    ctx.translate(branchSize, 0)
    ctx.scale(0.7, 0.7)
    ctx.rotate(spread)
    drawBranch(level + 1, maxLevel, spread)
    ctx.restore()
  }
}

drawFractal()
regenerateBtn.addEventListener('click', drawFractal)