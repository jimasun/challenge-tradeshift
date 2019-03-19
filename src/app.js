import './style.css'
import Ui from './modules/ui'
import Triangle from './modules/triangle'
import drawTriangle from './modules/drawTriangle'

ts.ui.ready(() => {
  drawTriangle(document.querySelector('#drawing'))
  const ui = new Ui()
  const triangle = new Triangle()
  ui.tEvalCb = triangle.typeOfTriangle
  ui.tSideValCb = triangle.isValidSideValue
  ui.tValCb = triangle.isValidTriangle
})
