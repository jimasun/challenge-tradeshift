// init
ts.ui.ready(() => {
  console.info('ts.ui.ready')
})

const initUi = () => {
  const formItems = document.querySelector('form')
  formItems.namedItem('a')
}


// ui module
const toggleAutoEvaluation = () => {
  const formItems = document.querySelector('form')
  formItems.elements.array.forEach(element => {
    if (element.type == 'number')
      element.addEventListener('onChange', event => {
        evaluate()
      })
  });
}

const evaluate = () => {
  typeOfTriangle()
}


// triange module
const typeOfTriangle = ([a, b, c]) => {
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