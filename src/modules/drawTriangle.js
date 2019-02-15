const drawTriangle = ([a, b, c] = [1, 1, 1]) => {
  const cnv = document.querySelector('#drawing')
  const ctx = cnv.getContext('2d')
  const start = 4
  const end = 144
  const gradient = ctx.createLinearGradient(0, 0, 0, 200)

  gradient.addColorStop(0, '#0000ff')
  gradient.addColorStop(1, '#00ff00')

  ctx.beginPath()
  ctx.moveTo(start, end)
  ctx.lineTo(end, start)
  ctx.lineTo(end * 2, end)
  ctx.lineTo(start, end)

  ctx.lineWidth = 4
  ctx.strokeStyle = gradient
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
  ctx.shadowBlur = 8
  ctx.shadowColor = 'rgba(0, 0, 0, 1)'
  ctx.stroke()
}

export default drawTriangle
