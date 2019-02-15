// init
ts.ui.ready(() => {
  drawTriangle()
  const ui = new Ui()
  ui.tEvalCb = typeOfTriangle
  ui.tSideValCb = isValidSideValue
  ui.tValCb = isValidTriangle
})


// ui module
class Ui {

  constructor() {
    const form = document.querySelector('form')
    this.a = form.elements.namedItem('a')
    this.b = form.elements.namedItem('b')
    this.c = form.elements.namedItem('c')
    this.button = form.elements.namedItem('button')
    this.switch = form.elements.namedItem('switch')

    this.autoEvaluationTimeout = 500
    this.autoEvaluationTimeoutId = null

    this.autoEvaluate =
      this.button.disabled =
      this.switch.checked = true

    this.button.addEventListener('click', event => this.onButtonClickEventListener(event))

    this.switch.addEventListener('change', event => this.onSwitchChangeEventListener(event))

      ;[...form.elements].forEach(element => {
        if (element.type == 'number')
          element.addEventListener('keydown', event => this.onInputChangeEventListener(event))
      })
  }

  onButtonClickEventListener(event) {
    if (this.validateTriangle(true)) {
      this.evaluateTriange([this.a.value, this.b.value, this.c.value])
    }
  }

  onSwitchChangeEventListener(event) {
    this.autoEvaluate = this.button.disabled = !this.autoEvaluate
    if (this.autoEvaluate && this.validateTriangle(true)) {
      this.evaluateTriange([this.a.value, this.b.value, this.c.value])
    }
  }

  onInputChangeEventListener(event) {
    clearTimeout(this.autoEvaluationTimeoutId)
    this.autoEvaluationTimeoutId = setTimeout(() => {
      const inputCheck = this.tSideValCb(event.target.value)
      if (!inputCheck.isValid) {
        console.log(inputCheck.msg)
        return false
      }
      if (!this.autoEvaluate || !this.validateTriangle(false)) return
      this.evaluateTriange([this.a.value, this.b.value, this.c.value])
    }, this.autoEvaluationTimeout)
  }

  evaluateTriange([a, b, c]) {
    const triange = this.tEvalCb([a, b, c])
    ts.ui.Notification.info('The **\u25b3** is **' + triange.type + '**\r\nThe congruent sides are: `' + triange.cong + '`');
  }

  validateTriangle(showErrors) {
    const a = this.tSideValCb(this.a.value),
      b = this.tSideValCb(this.b.value),
      c = this.tSideValCb(this.c.value)

    if (a.isValid && b.isValid && c.isValid) {
      const t = tValCb([a, b, c])

      if (!t.isValid) {
        console.log(t.msg)
        return false
      }

      return true
    }

    if (!a.isValid && showErrors) {
      console.log(a.msg)
    }

    if (!b.isValid && showErrors) {
      console.log(a.msg)
    }

    if (!c.isValid && showErrors) {
      console.log(a.msg)
    }

    return false
  }

  tEvalCb([a, b, c]) {
    throw new Error('not implemented: f([a, b, c])')
  }

  tSideValCb(s) {
    throw new Error('not implemented: f(int s)')
  }

  tValCb([a, b, c]) {
    throw new Error('not implemented: f([a, b, c])')
  }
}


// drawing module
const drawTriangle = ([a, b, c] = [1, 1, 1]) => {
  const cnv = document.querySelector('#drawing'),
    ctx = cnv.getContext('2d'),
    start = 4,
    end = 144,
    gradient = ctx.createLinearGradient(0, 0, 0, 200)

  gradient.addColorStop(0, '#0000ff')
  gradient.addColorStop(1, '#00ff00')

  ctx.beginPath()
  ctx.moveTo(start, end)
  ctx.lineTo(end, start)
  ctx.lineTo(end * 2, end)
  ctx.lineTo(start, end)

  ctx.lineWidth = 4
  ctx.strokeStyle = gradient
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 8;
  ctx.shadowColor = 'rgba(0, 0, 0, 1)'
  ctx.stroke()
}



// triange module
const typeOfTriangle = ([a, b, c]) => {
  if (!isValidSideValue(a).isValid || !isValidSideValue(b).isValid || !isValidSideValue(c).isValid) {
    throw new Error('invalid value(s) provided. use `isValidSideValue(int a)`')
  }
  const triangle = [a, b, c]
  if (isEquilateral(triangle)) return {
    type: 'equilateral',
    cong: triangleCongruentSides(triangle)
  }
  if (isIsosceles(triangle)) return {
    type: 'isoscel',
    cong: triangleCongruentSides(triangle)
  }
  return {
    type: 'scalane',
    cong: 'a != b != c'
  }
}

const isEquilateral = ([a, b, c]) => {
  return a === b && a === c && b === c
}

const isIsosceles = ([a, b, c]) => {
  return a === b || a === c || b === c
}

const triangleCongruentSides = ([a, b, c]) => {
  if (a === b === c) return 'a = b =c'
  if (a === b) return 'a = b'
  if (a === c) return 'a = c'
  if (b === c) return 'b = c'
  return 'a != b != c'
}

const isValidSideValue = (side) => {
  if (isNaN(side)) return {
    msg: 'The value should be a number',
    isValid: false,
    value: side
  }
  if (side <= 0) return {
    msg: 'The value should be greater than 0',
    isValid: false,
    value: side
  }
  return {
    msg: 'sucess',
    isValid: true,
    value: side
  }
}

const isValidTriangle = ([a, b, c]) => {
  if (
    !isValidSideValue(isValidSideValue(a)) ||
    !isValidSideValue(isValidSideValue(b)) ||
    !isValidSideValue(isValidSideValue(c))
  ) {
    throw new Error('one of the sides not valid. Use isValidSideValue(int s)')
  }

  const max = Math.max(a, b, c)

  if (a === max && b + c >= max) return {
    isValid: false,
    msg: '!(b + c < a)'
  }

  if (b === max && a + c >= max) return {
    isValid: false,
    msg: '!(a + c < b)'
  }

  if (c === max && a + b >= max) return {
    isValid: false,
    msg: '!(a + b < c)'
  }

  return {
    isValid: true,
    msg: `triangle [${a}, ${b}, ${c}] is valid`
  }
}