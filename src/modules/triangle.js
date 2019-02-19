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
    msg: `The value should be a number. NaN provided`,
    isValid: false,
    value: side
  }

  if (typeof side !== 'number') return {
    msg: `The value should be a number. (${typeof side}) ${side} provided`,
    isValid: false,
    value: side
  }

  if (side <= 0) return {
    msg: 'The value should be greater than 0',
    isValid: false,
    value: side
  }

  return {
    msg: 'The value is a valid side',
    isValid: true,
    value: side
  }
}

const isValidTriangle = ([a, b, c]) => {
  if (
    !isValidSideValue(a).isValid ||
    !isValidSideValue(b).isValid ||
    !isValidSideValue(c).isValid
  ) {
    throw new Error('one of the sides not valid. Use isValidSideValue((number) s)')
  }

  const max = Math.max(a, b, c)

  if (a === max && b + c <= max) return {
    isValid: false,
    msg: '`!(b + c < a)`: the sum of the two smaller sides should be smaller than the greater'
  }

  if (b === max && a + c <= max) return {
    isValid: false,
    msg: '`!(a + c < b)`: the sum of the two smaller sides should be smaller than the greater'
  }

  if (c === max && a + b <= max) return {
    isValid: false,
    msg: '`!(a + b < c)`: the sum of the two smaller sides should be smaller than the greater'
  }

  return {
    isValid: true,
    msg: `triangle [${a}, ${b}, ${c}] is valid`
  }
}

export {
  typeOfTriangle,
  isValidSideValue,
  isValidTriangle
}
