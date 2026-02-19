const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const regenerateBtn = document.getElementById('regenerateBtn')

const size = 700

class Fractal {
  constructor(drawMode) {
    this.lineWidth = Math.floor(Math.random() * 11) + 4
    this.hue = Math.random() * 360
    this.sides = Math.floor(Math.random() * 6) + 2
    this.maxLevel = 5
    this.spread = Math.random() * 0.5 + 0.4
    this.scale = Math.random() * 0.1 + 0.7
    this.branches = 3
    this.branchSize = 150
    this.drawMode = drawMode
  }

  draw(ctx) {
    ctx.lineWidth = this.lineWidth
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    for (let i = 0; i < this.sides; i++) {
      this.drawBranch(ctx, 0)
      ctx.rotate(Math.PI * 2 / this.sides)
    }
    ctx.restore()
  }

  drawBranch(ctx, level) {
    if (level > this.maxLevel) return
    
    const lightness = 10 + level * 10
    
    if (this.drawMode === 'branches') {
      ctx.strokeStyle = `hsl(${this.hue}, 100%, ${lightness}%)`
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(this.branchSize, 0)
      ctx.stroke()
    }
    
    else if (this.drawMode === 'circles') {
      ctx.fillStyle = `hsl(${this.hue + 10 }, 100%, ${lightness + 5}%)`
      ctx.beginPath()  
      ctx.arc(this.branchSize, 0, this.lineWidth * 1.5, 0, Math.PI * 2)
      ctx.fill()
    }

    else if (this.drawMode === 'sparks') {
      if (level > this.maxLevel - 4 && Math.random() < 0.1) {
        ctx.fillStyle = `hsl(${this.hue + 10}, 100%, ${lightness + 20}%)`
        ctx.globalAlpha = 0.6
        for (let i = 0; i < 5; i++) {
          ctx.save()
          ctx.translate(250, 150)
          ctx.rotate((Math.PI * 2 / 5) * i)
          ctx.beginPath()
          ctx.ellipse(0, 8, 4, 50, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
        ctx.globalAlpha = 1  
      }
    }
    
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
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const fractal = new Fractal('branches')
  fractal.draw(ctx)
  fractal.drawMode = 'sparks'
  fractal.draw(ctx)
}

regenerateBtn.addEventListener('click', drawFractal)

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.lineCap = 'round'
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
  ctx.shadowBlur = 10
  ctx.shadowOffsetX = 3
  ctx.shadowOffsetY = 3

  drawFractal()
}

window.addEventListener('resize', resizeCanvas)
resizeCanvas()