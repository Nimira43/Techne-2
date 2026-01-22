const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const size = 600
canvas.height = size
canvas.width = size
ctx.strokeStyle = '#ffd700'
ctx.lineWidth = 10

const sides = 3

function drawFractal() {
  ctx.translate(size / 2, size / 2)

  for (let i = 0; i < sides; i++) {
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(200, 0)
    ctx.stroke()
    ctx.rotate(Math.PI * 2 / sides)
  }
}

