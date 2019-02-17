import Ui from './modules/ui'
import drawTriangle from './modules/drawTriangle'
import {
  typeOfTriangle,
  isValidSideValue, isValidTriangle
} from './modules/triangle'

ts.ui.ready(() => {
  drawTriangle()
  const ui = new Ui()
  ui.tEvalCb = typeOfTriangle
  ui.tSideValCb = isValidSideValue
  ui.tValCb = isValidTriangle
})
