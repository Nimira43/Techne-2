const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const size = 600
canvas.height = size
canvas.width = size
ctx.strokeStyle = '#ffd700'
ctx.lineWidth = 10

const sides = 10

function drawFractal() {
  ctx.save()
  ctx.translate(size / 2, size / 2)

  for (let i = 0; i < sides; i++) {
    drawBranch(0)
    ctx.rotate(Math.PI * 2 / sides)
  }
  ctx.restore()
}
  
function drawBranch(level) {
  if (level > 7) return

  const branchSize = 100
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(branchSize, 0)
  ctx.stroke()

  ctx.save()

  ctx.translate(branchSize, 0)
  ctx.scale(0.7, 0.7)

  ctx.save()
  ctx.rotate(0.8)
  drawBranch(level + 1)
  ctx.restore()

  ctx.save()
  ctx.rotate(-0.8)
  drawBranch(level + 1)
  ctx.restore()

  ctx.restore()
}

drawFractal()