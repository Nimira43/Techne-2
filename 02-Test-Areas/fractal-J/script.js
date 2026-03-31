const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const regenerateBtn = document.getElementById('regenerateBtn')

const size = 700

class Fractal {
  constructor(drawMode) {
    this.lineWidth = Math.floor(Math.random() * 11) + 5
    this.hue = Math.random() < 0.8 
      ? Math.random() * 30 + 170
      : Math.random() * 40 + 280
    this.sides = 6    
    this.maxLevel = 4
    this.spread = Math.random() * 0.2 + 0.2
    this.scale = Math.random() * 0.1 + 0.7
    this.branches = 4
    this.branchSize = 190
    this.drawMode = drawMode

    this.antennaAngle = Math.random() * 0.2 + 0.2
    this.bodySize = Math.random() * 15 + 10
    this.upperWingAngle = Math.random() * 0.4 + 1.1
    this.lowerWingAngle = Math.random() * 0.2 + 2.2
    this.membraneSize = Math.random() * 1.5 + 2.5
  }

  draw(ctx) {
    ctx.lineWidth = this.lineWidth
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)

    ctx.fillStyle = `hsl(${this.hue - 10}, 100%, 50%)`
    const numCircles = this.bodySize
    const bodyLength = this.branchSize
    const spacing = bodyLength / (numCircles - 1)

    for (let i = numCircles - 1; i > 0; i--) {
      const y = i * spacing - bodyLength / 2
      const progress = i / (numCircles - 1)
      const sizeMultiplier = Math.abs(Math.sin(progress * Math.PI * 2.6))
      const radius = this.bodySize * (0.3 + sizeMultiplier)
      ctx.beginPath()
      ctx.arc(0, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.save()
    ctx.translate(-this.bodySize / 2, -60)
    ctx.rotate(-Math.PI / 2 - this.antennaAngle)
    ctx.scale(0.8, 0.7)
    this.drawBranch(ctx, this.maxLevel - 3)
    ctx.restore()
    
    ctx.save()
    ctx.translate(this.bodySize / 2, -60)
    ctx.rotate(-Math.PI / 2 + this.antennaAngle)
    ctx.scale(0.8, -0.7)
    this.drawBranch(ctx, this.maxLevel - 3)
    ctx.restore()
    
    ctx.save()
    ctx.translate(-this.bodySize, 0)
    ctx.rotate(-Math.PI / 2 - this.upperWingAngle)
    ctx.scale(1.2, 1.2)
    this.drawBranch(ctx, 0)
    ctx.restore()
    
    ctx.save()
    ctx.translate(this.bodySize, 0)
    ctx.rotate(-Math.PI / 2 + this.upperWingAngle)
    ctx.scale(1.2, -1.2)
    this.drawBranch(ctx, 0)
    ctx.restore()
    
    ctx.save()
    ctx.translate(-this.bodySize, 0)
    ctx.rotate(-Math.PI / 2 - this.lowerWingAngle)
    ctx.scale(0.7, 0.8)
    this.drawBranch(ctx, 0)
    ctx.restore()
    
    ctx.save()
    ctx.translate(this.bodySize, 0)
    ctx.rotate(-Math.PI / 2 + this.lowerWingAngle)
    ctx.scale(0.7, -0.8)
    this.drawBranch(ctx, 0)
    ctx.restore()

    ctx.restore()
  }

  drawBranch(ctx, level) {
    if (level > this.maxLevel) return
    
    const lightness = 10 + level * 10
    
    if (this.drawMode === 'branches') {
      ctx.save()
      ctx.strokeStyle = `hsl(${this.hue}, 100%, ${lightness}%)`
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(this.branchSize, 0)
      ctx.stroke()
      ctx.restore()
    }
    
    else if (this.drawMode === 'circles') {
      ctx.fillStyle = `hsl(${this.hue + 10}, 100%, ${lightness + 5}%)`
      ctx.beginPath()  
      ctx.arc(this.branchSize, 0, this.lineWidth * 1.5, 0, Math.PI * 2)
      ctx.fill()
    }

    else if (this.drawMode === 'sparks') {
      if (level > this.maxLevel - 4 && Math.random() < 0.05) {
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

    else if (this.drawMode === 'electricity') {
      ctx.strokeStyle = `hsl(${this.hue}, 100%, ${lightness}%)`
      if (level < this.maxLevel - 2) {
        ctx.save()
        ctx.lineWidth = 2
        ctx.shadowColor = `hsl(${this.hue}, 100%, 90%)`
        ctx.shadowBlur = 4
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(this.branchSize * 0.2, Math.random() * 20 - 10)
        ctx.lineTo(this.branchSize * 0.4, Math.random() * 40 - 20)
        ctx.lineTo(this.branchSize * 0.6, Math.random() * 180 - 90)
        ctx.lineTo(this.branchSize * 0.8, Math.random() * 100 - 50)
        ctx.lineTo(this.branchSize, Math.random() * 40 - 20)
        ctx.stroke()
        ctx.restore()
      }
    }

    else if (this.drawMode === 'membrane') {
      if (level === 0) {
        ctx.save()
        const gradient = ctx
          .createRadialGradient(0, 0, 0, 0, 0, this.branchSize * 3.5)
        gradient
          .addColorStop(0, `hsla(${this.hue}, 80%, 60%, 0.35)`)
        gradient
          .addColorStop(0.6, `hsla(${this.hue}, 70%, 50%, 0.15)`)
        gradient
          .addColorStop(1, `hsla(${this.hue}, 60%, 40%, 0.02)`)
      
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(0, 0)

        for (let t = 0; t <= 1; t += 0.02) {
          const x = this.branchSize * t * this.membraneSize
          const width = this.branchSize * 1.2 * Math.sin(t * Math.PI)
          ctx.lineTo(x, width)
        }
        
        for (let t = 1; t >= 0; t -= 0.02) {
          const x = this.branchSize * t * this.membraneSize
          const width = this.branchSize * 1.2 * Math.sin(t * Math.PI)
          ctx.lineTo(x, -width)
        }

        ctx.closePath()
        ctx.fill()
        ctx.lineWidth = 1
        ctx.strokeStyle = `hsla(${this.hue + 20}, 100%, 70%, 0.25)`
        ctx.stroke()
        ctx.restore() 
      }
    }

    else if (this.drawMode === 'bioluminescence') {
      if (level > this.maxLevel - 3 && Math.random() < 0.1) {
        ctx.save()
        const xPos = Math.random() * this.branchSize
        const yPos = (Math.random() - 0.5) * 20
        const dotSize = Math.random() * 8 + 4
        
        const gradient = ctx
          .createRadialGradient(xPos, yPos, 0, xPos, yPos, dotSize * 4)
        gradient
          .addColorStop(0, `hsla(${this.hue}, 100%, 90%, 0.9)`)
        gradient
          .addColorStop(0.5, `hsla(${this.hue}, 100%, 60%, 0.4)`)
        gradient
          .addColorStop(1, `hsla(${this.hue}, 100%, 40%, 0)`)
        
        ctx.fillStyle = gradient
        ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, 0.8)`
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(xPos, yPos, dotSize * 4, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.fillStyle = `hsla(${this.hue + 20}, 100%, 95%, 1)`
        ctx.beginPath()
        ctx.arc(xPos, yPos, dotSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    else if (this.drawMode === 'scales') {
      if (level > this.maxLevel - 1 && Math.random() > 0.2) {
        ctx.save()
        const size = Math.random() * 15 + 15
        ctx.lineWidth = 3
        ctx.fillStyle = `hsla(${this.hue + 10}, 100%, 40%, 0.5)`
        ctx.strokeStyle = `hsla(${this.hue}, 100%, 60%, 0.8)`
        ctx.beginPath()
        ctx.translate(size, 0)                                  
        ctx.moveTo(this.branchSize, -size)
        ctx.lineTo(this.branchSize + size * (Math.random() * 10 + 10), 0)
        ctx.lineTo(this.branchSize, size)
        ctx.lineTo(this.branchSize + size, 0)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        ctx.restore()
      }
    }
    
    for (let i = 0; i < this.branches; i++) {
      const position = this.branchSize - (this.branchSize / this.branches) * i
      const angle = this.spread * 2.1 * i * 1.3 / this.branches - this.spread * 0.95

      ctx.save()
      ctx.translate(position, 0)
      ctx.scale(this.scale, this.scale)
      ctx.rotate(angle)
      this.drawBranch(ctx, level + 1)
      ctx.restore()

      if (level < this.maxLevel - 3) {
        ctx.save()
        ctx.translate(position, 0)
        ctx.scale(this.scale * 0.7, this.scale * 0.75)
        ctx.rotate(-angle)
        this.drawBranch(ctx, level + 1)
        ctx.restore()
      }
    }
  }
}

function drawFractal() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const fractal = new Fractal('membrane')
  fractal.draw(ctx)
  fractal.drawMode = 'branches'
  fractal.draw(ctx)
  fractal.drawMode = 'scales'
  fractal.draw(ctx)
  fractal.drawMode = 'bioluminescence'
  fractal.draw(ctx)
  
  // fractal.drawMode = 'electricity'
  // fractal.draw(ctx)
  // fractal.drawMode = 'circles'
  // fractal.draw(ctx)
  // fractal.drawMode = 'sparks'
  // fractal.draw(ctx)
}

regenerateBtn.addEventListener('click', drawFractal)

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.lineCap = 'round'
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
  ctx.shadowBlur = 20
  ctx.shadowOffsetX = 3
  ctx.shadowOffsetY = 3

  drawFractal()
}

window.addEventListener('resize', resizeCanvas)
resizeCanvas()