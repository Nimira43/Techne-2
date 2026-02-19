const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const regenerateBtn = document.getElementById('regenerateBtn')

const size = 600
canvas.height = size
canvas.width = size
ctx.strokeStyle = '#ffd700'
ctx.lineWidth = 2

function drawFractal() {
  const sides = 5
  const maxLevel = 7
  const spread = Math.random() * 2 - 0.5
  const scale = Math.random() * 0.15 + 0.65
  const branches = 3
  
  ctx.clearRect(0, 0, size, size)
  ctx.save()
  ctx.translate(size / 2, size / 2)

  for (let i = 0; i < sides; i++) {
    drawBranch(0, maxLevel, spread, scale, branches)
    ctx.rotate(Math.PI * 2 / sides)
  }
  ctx.restore()
}
  
function drawBranch(level, maxLevel, spread, scale, branches) {
  if (level > maxLevel) return

  const branchSize = 100
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(branchSize, 0)
  ctx.stroke()

  for (let i = 0; i < branches; i++) {
    // make changes to formula in (brackets)
    const position = branchSize - (branchSize / branches * 2 / 0.5) * i
    ctx.save()
    ctx.translate(position, 0)
    ctx.scale(scale, scale)
    ctx.rotate(spread)
    drawBranch(level + 1, maxLevel, spread, scale, branches)
    ctx.restore()
  }
}

drawFractal()
regenerateBtn.addEventListener('click', drawFractal)