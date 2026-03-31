const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const regenerateBtn = document.getElementById('regenerateBtn')

const size = 700

class Fractal {
  constructor(drawMode) {
    this.lineWidth = Math.floor(Math.random() * 11) + 4
    this.hue = Math.random() * 360
    this.sides = 6    
    this.maxLevel = 5
    this.spread = Math.random() * 0.3 + 0.3
    this.scale = Math.random() * 0.1 + 0.7
    this.branches = 4
    this.branchSize = 160
    this.drawMode = drawMode

    this.antennaAngle = Math.random() * 0.2 + 0.2
    this.bodySize = Math.random() * 20 + 10
    this.upperWingAngle = Math.random() * 0.4 + 1
    this.lowerWingAngle = Math.random() * 0.3 + 2.1
  }

  draw(ctx) {
    ctx.lineWidth = this.lineWidth
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)

    ctx.fillStyle = `hsl(0, 100%, 54%)`
    const numCircles = this.bodySize
    const bodyLength = this.branchSize
    const spacing = bodyLength / (numCircles - 1)

    for (let i = numCircles - 1; i > 0; i--) {
      const y = i * spacing - bodyLength / 2
      const progress = i / (numCircles - 1)
      const sizeMultiplier = Math.sin(progress * Math.PI) * (Math.random() * 0.5 + 0.7)
      const radius = this.bodySize * (0.3 + sizeMultiplier)
      ctx.beginPath()
      ctx.arc(0, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.save()
    ctx.translate(-this.bodySize / 2, -60)
    ctx.rotate(-Math.PI / 2 - this.antennaAngle)
    ctx.scale(0.8, -0.7)
    this.drawBranch(ctx, this.maxLevel - 2)
    ctx.restore()
    
    ctx.save()
    ctx.translate(this.bodySize / 2, -60)
    ctx.rotate(-Math.PI / 2 + this.antennaAngle)
    ctx.scale(0.8, 0.7)
    this.drawBranch(ctx, this.maxLevel - 2)
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
      if (level < this.maxLevel - 1) {
        ctx.save()
        ctx.strokeStyle = `hsl(0, 100%, 32%)`
        ctx.lineWidth = this.lineWidth * 1.5
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(this.branchSize, 0)
        ctx.stroke()
        ctx.restore()
      }
    }
    
    else if (this.drawMode === 'circles') {
      ctx.fillStyle = `hsl(${this.hue + 10 }, 100%, ${lightness + 5}%)`
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
        ctx.shadowOffsetY = 6
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

    else if (this.drawMode === 'glow') {
      if (level < this.maxLevel) {
        ctx.save()
        ctx.strokeStyle = `hsla(0, 100%, 54%, 0.8)`
        ctx.lineWidth = this.lineWidth * Math.random() * 4 + 10
        ctx.shadowColor = `hsla(0, 100%, 54%, 0.8)`
        ctx.shadowBlur = 60
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(this.branchSize * 0.5, Math.random() * 80 - 40, this.branchSize * 1.5, 0)
        ctx.stroke()
        ctx.restore()
      }
    }

    else if (this.drawMode === 'veins') {
      if (level < this.maxLevel) {
        ctx.strokeStyle = `hsl(0, 100%, 20%)`
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.moveTo(0, 0)
        const cp1x = this.branchSize * 0.33
        const cp1y = (Math.random() - 0.5) * 80
        const cp2x = this.branchSize * 0.66
        const cp2y = (Math.random() - 0.5) * 80
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, this.branchSize, 0)
        ctx.stroke()
      }
    }

    else if (this.drawMode === 'tendrils') {
      ctx.save()

      if (level < this.maxLevel && level > 2 && Math.random() < 0.25) {
        ctx.strokeStyle = `hsl(0, 100%, 20%)`
        ctx.lineWidth = this.lineWidth
        ctx.shadowColor = `hsla(0, 100%, 50%, 0.6)`
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.moveTo(0, 0)
        const length = this.branchSize * 4
        const segments = 20
        const waveFreq = 2
        const waveAmp = 40

        for (let i = 1; i <= segments; i++) {
          const t = i / segments
          const x = length * t
          const y = Math.sin(t * Math.PI * waveFreq) * waveAmp
          ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`
        ctx.lineWidth = this.lineWidth * 0.3
        ctx.stroke()
      }
      ctx.restore()
    }

    else if (this.drawMode === 'spores') {
      if (level > 1 && level < this.maxLevel && Math.random() < 0.5) {
        ctx.save()
        ctx.fillStyle = `hsl(0, 100%, 15%)`
        ctx.shadowColor = `hsla(0, 100%, 55%, 0.8)`
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.arc(this.branchSize + Math.random() * this.branchSize * 4, 0, Math.random() * 10 + 2, 0, Math.PI * 2) 
        ctx.fill()
        ctx.restore()
      }
    }
    
    for (let i = 0; i < this.branches; i++) {
      const position = this.branchSize - (this.branchSize / this.branches) * i
      const angle = this.spread * 2.1 * i / this.branches - this.spread * 0.95

      ctx.save()
      ctx.translate(position, 0)
      ctx.scale(this.scale, this.scale)
      ctx.rotate(angle)
      this.drawBranch(ctx, level + 1)
      ctx.restore()
    }
  }
}

function drawFractal() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const fractal = new Fractal('glow')
  fractal.draw(ctx)
  fractal.drawMode = 'branches'
  fractal.draw(ctx)
  fractal.drawMode = 'veins'
  fractal.draw(ctx)
  fractal.drawMode = 'tendrils'
  fractal.draw(ctx)
  fractal.drawMode = 'spores'
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
  ctx.shadowColor = 'hsla(0, 100%, 10%, 0.3)'
  ctx.shadowBlur = 20
  ctx.shadowOffsetX = 3
  ctx.shadowOffsetY = 3

  drawFractal()
}

window.addEventListener('resize', resizeCanvas)
resizeCanvas()