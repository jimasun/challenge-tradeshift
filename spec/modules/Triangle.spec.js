import test from 'ava'
import {
  isValidSideValue
} from '../../src/modules/triangle'

test('should reject invalid values', t => {
  t.falsy(isValidSideValue(NaN).isValid, 'NaN')
  t.falsy(isValidSideValue({}).isValid, 'object')
  t.falsy(isValidSideValue(0).isValid, '0')
  t.falsy(isValidSideValue(-1).isValid, 'negative')
  t.falsy(isValidSideValue('1').isValid, 'string')
})

test('should accept valid values', t => {
  t.truthy(isValidSideValue(1).isValid, 'integer')
  t.truthy(isValidSideValue(1.345).isValid, 'fractional')
})
