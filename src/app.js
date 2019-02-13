// init
ts.ui.ready(() => {
  const ui = new Ui()
  ui.evaluationCallback = typeOfTriangle
  ui.validateInput = isValidSideValue
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

    this.button.addEventListener('click', event => {
      this.onChangeCallback([this.a.value, this.b.value, this.c.value])
    })

    this.switch.addEventListener('change', event => {
      this.autoEvaluate = this.button.disabled = !this.autoEvaluate
      if (this.autoEvaluate) {
        this.onChangeCallback([this.a.value, this.b.value, this.c.value])
      }
    })

      ;[...form.elements].forEach(element => {
        if (element.type == 'number')
          element.addEventListener('keydown', event => this.onChangeEventListener(event))
      })
  }

  onChangeEventListener(event) {
    clearTimeout(this.autoEvaluationTimeoutId)
    this.autoEvaluationTimeoutId = setTimeout(() => {
      const inputCheck = this.validateInput(event.target.value)
      if (!inputCheck.isValid) {
        console.log(inputCheck.msg)
        return false
      }
      if (!this.autoEvaluate) return
      this.onChangeCallback([this.a.value, this.b.value, this.c.value])
    }, this.autoEvaluationTimeout)
  }

  onChangeCallback([a, b, c]) {
    const triange = this.evaluationCallback([a, b, c])
    ts.ui.Notification.success('The \u25b3 is ' + triange.type + '\r\nThe congruent sides are: ' + triange.cong);
  }

  evaluationCallback() {
    throw new Error('not implemented: f([a, b, c])')
  }

  validateInput() {
    throw new Error('not implemented: f(int a)')
  }
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
  const result = {
    msg: 'sucess',
    isValid: true
  }
  if (isNaN(side)) {
    result.msg = 'The value should be a number'
    result.isValid = false
  }
  if (side <= 0) {
    result.msg = 'The value should be greater than 0'
    result.isValid = false
  }
  return result
}