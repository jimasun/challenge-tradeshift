import Triangle from '../../src/modules/Triangle'

const test = require('ninos')(require('ava'))
const triangle = new Triangle()

test('isValidSideValue(int s)', t => {
  t.false(triangle.isValidSideValue(NaN).isValid, 'NaN')
  t.false(triangle.isValidSideValue({}).isValid, 'object')
  t.false(triangle.isValidSideValue(0).isValid, 'zero')
  t.false(triangle.isValidSideValue(-1).isValid, 'negative')
  t.false(triangle.isValidSideValue('1').isValid, 'string')
  t.true(triangle.isValidSideValue(1).isValid, 'integer')
  t.true(triangle.isValidSideValue(1.345).isValid, 'fractional')
})

test('isValidTriangle([a, b, c])', t => {
  const s = t.context.spy(triangle, 'isValidSideValue')
  t.false(triangle.isValidTriangle([1, 4, 2]).isValid, 'a+c<b [1, 4, 2]')
  t.is(s.calls.length, 3, '(3) isValidSideValue')
  t.true(triangle.isValidTriangle([2, 3, 2]).isValid, 'a+c<b [2, 3, 2]')
  t.is(s.calls.length, 6, '(3) isValidSideValue')
  t.throws(() => { triangle.isValidTriangle([-1, 4, 2]) }, Error, 'throw new Error')
})

test('typeOfTriangle([a, b, c])', t => {
  t.is(triangle.typeOfTriangle([1, 1, 1]).type, 'equilateral', 'equilateral')
  t.is(triangle.typeOfTriangle([2, 1.5, 1.5]).type, 'isoscel', 'isoscel')
  t.is(triangle.typeOfTriangle([2.5, 4, 2.5]).type, 'isoscel', 'isoscel')
  t.is(triangle.typeOfTriangle([7, 2, 6]).type, 'scalane', 'scalane')
  t.throws(() => { triangle.typeOfTriangle([1, 4, 2]) }, Error, 'throw new Error')
})
