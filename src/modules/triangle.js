/**
 * Small utility class for calculating triangles
 * @class {Triangle} Triangle
 */
export default class Triangle {
  /**
   * Constructor optionally taking arguments
   * @param {number[]} [sides] The sides of the triangle
   */
  constructor ([a, b, c] = [null, null, null]) {
    this.a = a
    this.b = b
    this.c = c
  }

  /**
   * Validate the accepted values of a triangle's side
   * @param {number} side The triangle side to be validated
   * @returns {object} `return`
   * @returns {boolean} `return.isValid` `true` if the side is valid
   * @returns {string} `return.msg` eventual error messages
   */
  isValidSideValue (side) {
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

  /**
   * Validates if the provided values ca form a triangle
   * @param {number[]} [sides] The triangle's sides to be validated
   * @returns {object}
   * @returns {object} `return` contains validation data
   * @returns {boolean} `return.isValid` `true` if the side is valid
   * @returns {string} `return.msg` eventual error messages
   * @throws {Error} Throws when side(s) not valid
   */
  isValidTriangle ([a, b, c] = [this.a, this.b, this.c]) {
    if (
      !this.isValidSideValue(a).isValid ||
      !this.isValidSideValue(b).isValid ||
      !this.isValidSideValue(c).isValid
    ) {
      throw new Error('one of the sides not valid. Use isValidSideValue(Number: s)')
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

  /**
   * Evaluates and validates a triangle
   * @param {number[]} [sides] The sides of the triangle
   * @returns {object} `return` Triangle analisys data
   * @returns {string} `return.type` the type of triangle
   * @returns {string} `return.cong` the equality among the sides
   * @throws {Error} Throws when the triangle is not valid
   */
  typeOfTriangle ([a, b, c] = [this.a, this.b, this.c]) {
    if (!this.isValidTriangle([a, b, c]).isValid) {
      throw new Error('invalid triangle value(s) provided. use isValidTriangle([a, b, c])')
    }

    const triangle = [a, b, c]

    if (this.isEquilateral(triangle)) return {
      type: 'equilateral',
      cong: this.triangleCongruentSides(triangle)
    }

    if (this.isIsosceles(triangle)) return {
      type: 'isoscel',
      cong: this.triangleCongruentSides(triangle)
    }

    return {
      type: 'scalane',
      cong: 'a != b != c'
    }
  }

  /**
   * Method to check if a triangle is equilateral. Note that this
   * method does not do any validations. Use `typeOfTriangle` or
   * validate yourself with `sValidTriangle`
   * @param {number[]} [sides] Array containing the sides of a triangle
   * @returns {boolean} `true` if equilateral
   */
  isEquilateral ([a, b, c] = [this.a, this.b, this.c]) {
    return a === b && a === c && b === c
  }

  /**
  * Method to check if a triangle is isosceles. Note that this
  * method does not do any validations. Use `typeOfTriangle` or
  * validate yourself with `sValidTriangle`
  * @param {number[]} [sides] Array containing the sides of a triangle
  * @returns {boolean} `true` if isosceles
  */
  isIsosceles ([a, b, c] = [this.a, this.b, this.c]) {
    return a === b || a === c || b === c
  }

  /**
   * Calculates which sides of the triangle are congruent
   * @param {number[]} [sides] The sides of the triangle
   * @returns {string} `string` describing the equality of sides
   */
  triangleCongruentSides ([a, b, c] = [this.a, this.b, this.c]) {
    if (a === b === c) return 'a = b =c'
    if (a === b) return 'a = b'
    if (a === c) return 'a = c'
    if (b === c) return 'b = c'
    return 'a != b != c'
  }
}
