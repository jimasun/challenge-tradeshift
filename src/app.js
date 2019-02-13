// init
ts.ui.ready(() => {
  console.info('ts.ui.ready')

  const ui = new Ui()
  ui.onChangeCallback = typeOfTriangle
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

    this.autoEvaluate =
      this.button.disabled =
      this.switch.checked = true

    this.button.addEventListener('click', event => {
      this.onChangeCallback([this.a.value, this.b.value, this.c.value])
    })

    this.switch.addEventListener('change', event => {
      this.toggleAutoEvaluate()
      this.onChangeCallback([this.a.value, this.b.value, this.c.value])
    })

      ;[...form.elements].forEach(element => {
        if (element.type == 'number')
          element.addEventListener('onChange', this.onChangeEventListener)
      })
  }

  toggleAutoEvaluate() {
    this.autoEvaluate = this.button.disabled = !this.autoEvaluate
  }

  onChangeEventListener(event) {
    const inputCheck = validateInput(event.target.value)
    if (!inputCheck.isValid) {
      console.log(inputCheck.msg)
      return false
    }
    if (!this.autoEvaluate) return
    this.onChangeCallback([this.a.value, this.b.value, this.c.value])
  }

  onChangeCallback() {
    throw new Error('not implemented: f([a, b, c])')
  }

  validateInput() {
    throw new Error('not implemented: f(int a)')
  }
}


// triange module
const typeOfTriangle = ([a, b, c]) => {
  if (!isValidSideValue(a) || !isValidSideValue(b) && !isValidSideValue(c)) {
    throw new Error('invalid value(s) provided. use `isValidSideValue(int a)`')
  }

  const triangle = [a, b, c]

  if (isEquilateral(triangle)) return {
    msg: 'equilateral',
    calc: triangleCongruentSides(triangle)
  }
  if (isIsosceles(triangle)) return {
    msg: 'isoscel',
    calc: triangleCongruentSides(triangle)
  }
  return {
    msg: 'scalane',
    calc: 'a != b != c'
  }
}

const isEquilateral = ([a, b, c]) => {
  return a === b === c
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