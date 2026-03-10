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
    this.branches = 4
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

    else if (this.drawMode === 'runes') {
      if (level < this.maxLevel - 1) {
        ctx.fillStyle = `hsl(${this.hue + 15}, 100%, ${lightness + 30}%)`
        ctx.globalAlpha = 0.5
        ctx.font = '40px monospace'
        const runeSymbols = [
           'ᚨ', '◊', 'ᚱ', 'ᛇ', 'ᛗ', '✦', 'ᚹ', 'ᚺ', '⁂','ᛉ', 'ᚠ', 'ᚢ', '※', 'ᚦ', "ᛃ", "ᛈ"]
        const randomRune = runeSymbols[
          Math.floor(
            Math.random() * runeSymbols.length
          )
        ]
        ctx.fillText(randomRune, this.branchSize * (level + 1) * 0.5, this.branchSize * (level + 1) * -0.2)
        ctx.globalAlpha = 1
      }
    }

    else if (this.drawMode === 'droplets') {
      ctx.fillStyle = `hsl(${this.hue + 20}, 100%, ${lightness + 10}%)`
      ctx.save()
      ctx.translate(this.branchSize, 0)
      ctx.globalAlpha = 0.85
      ctx.beginPath()
      ctx.arc(0, 0, this.lineWidth * 1.5, 0, Math.PI * 2)
      ctx.fill()
      
      if (level < this.maxLevel - 2) {
        ctx.lineWidth = 0.5
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.stroke()
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.beginPath()
        ctx.arc(-this.lineWidth * 0.3, this.lineWidth * 0.5, this.lineWidth * 0.6, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }
    
    else if (this.drawMode === 'fur') {
      if (level > 3) {
        ctx.fillStyle = `hsl(${this.hue - 5}, 100%, ${lightness - 10}%)`
        ctx.save()
        ctx.translate(0, 50)
        ctx.fillRect(0, 0, 2, 110)
        ctx.restore()
      }
    }

    else if (this.drawMode === 'minerals') {
      if (level > 1 && Math.random() < 0.1) {
        ctx.fillStyle = `hsl(${this.hue + 10}, 100%, ${lightness - 5}%)`
        ctx.strokeStyle = `hsl(${this.hue - 10}, 100%, ${lightness + 40}%)`
        ctx.save()
        ctx.translate(this.branchSize, 0)
        ctx.rotate(Math.random() * Math.PI * 2)
        const size = 10 + Math.random() * 70
        ctx.lineWidth = 3
        ctx.globalAlpha = 0.8
        ctx.beginPath()
        ctx.moveTo(0, -size)
        ctx.lineTo(size * 0.5, -size * 0.3)
        ctx.lineTo(size, 0)
        ctx.lineTo(size * 0.5, size * 0.5)
        ctx.lineTo(0, size * 0.7)
        ctx.lineTo(-size * 0.5, size * 0.5)
        ctx.lineTo(-size, 0)
        ctx.lineTo(-size * 0.5, -size * 0.3)
        ctx.fill()
        ctx.stroke()
        ctx.restore()
      }
    }

    else if (this.drawMode === 'flames') {
      if (level > 2 && level < this.maxLevel) {
        const fireColour = `hsl(${30 + Math.random() * 30}, 100%, ${60 + Math.random() * 20}%)`
        ctx.fillStyle = fireColour
        ctx.save()
        ctx.globalAlpha = 0.1
        ctx.shadowColor = fireColour
        ctx.shadowBlur = 8        
        ctx.beginPath()
        ctx.moveTo(this.branchSize, 200)
        ctx.lineTo(this.branchSize - 200, Math.random() * 300 + 200)
        ctx.lineTo(this.branchSize + Math.random() * 150 - 20, Math.random() * 50)
        ctx.lineTo(this.branchSize + 10, 100)        
        ctx.fill()
        ctx.restore()
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
  // const fractal = new Fractal('electricity')
  const fractal = new Fractal('branches')
  fractal.draw(ctx)
  // fractal.drawMode = 'circles'
  // fractal.draw(ctx)
  fractal.drawMode = 'electricity'
  fractal.draw(ctx)
  // fractal.drawMode = 'runes'
  // fractal.draw(ctx)
  fractal.drawMode = 'droplets'
  fractal.draw(ctx)
  fractal.drawMode = 'fur'
  fractal.draw(ctx)
  fractal.drawMode = 'flames'
  fractal.draw(ctx)
  fractal.drawMode = 'minerals'
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