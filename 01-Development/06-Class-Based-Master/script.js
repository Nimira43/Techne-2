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

class Fractal {
  constructor() {
    this.lineWidth = Math.floor(Math.random() * 11) + 4
    this.hue = Math.random() * 360
    this.sides = Math.floor(Math.random() * 6) + 2
    this.maxLevel = 5
    this.spread = Math.random() * 0.5 + 0.4
    this.scale = Math.random() * 0.1 + 0.7
    this.branches = 4
    this.branchSize = 110
  }

  draw(ctx) {
    ctx.clearRect(0, 0, size, size)
    ctx.lineWidth = this.lineWidth
    ctx.save()
    ctx.translate(size / 2, size / 2)
    for (let i = 0; i < this.sides; i++) {
      this.drawBranch(ctx, 0)
      ctx.rotate(Math.PI * 2 / this.sides)
    }
    ctx.restore()
  }

  drawBranch(ctx, level) {
    if (level > this.maxLevel) return
    
    const lightness = 10 + level * 10
    ctx.strokeStyle = `hsl(${this.hue}, 100%, ${lightness}%)`
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(this.branchSize, 0)
    ctx.stroke()

    for (let i = 0; i < this.branches; i++) {
      const position = this.branchSize - (this.branchSize / this.branches) * i
      ctx.save()
      ctx.translate(position, 0)
      ctx.scale(this.scale, this.scale)
      ctx.rotate(this.spread * 2.1 * i / this.branches - this.spread * 0.95)
      this.drawBranch(ctx, level + 1)
      ctx.restore()
    }
  }
}

function drawFractal() {
  const fractal = new Fractal()
  fractal.draw(ctx)
}

drawFractal()
regenerateBtn.addEventListener('click', drawFractal)