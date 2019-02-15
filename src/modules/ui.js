export default class Ui {
  constructor () {
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

    Array.from(form.elements).forEach(element => {
      if (element.type === 'number') {
        element.addEventListener('keydown', event => this.onInputChangeEventListener(event))
      }
    })
  }

  onButtonClickEventListener (event) {
    if (this.validateTriangle(true)) {
      this.evaluateTriange([this.a.value, this.b.value, this.c.value])
    }
  }

  onSwitchChangeEventListener (event) {
    this.autoEvaluate = this.button.disabled = !this.autoEvaluate
    if (this.autoEvaluate && this.validateTriangle(true)) {
      this.evaluateTriange([this.a.value, this.b.value, this.c.value])
    }
  }

  onInputChangeEventListener (event) {
    clearTimeout(this.autoEvaluationTimeoutId)
    this.autoEvaluationTimeoutId = setTimeout(() => {
      const inputCheck = this.tSideValCb(+event.target.value)
      if (!inputCheck.isValid) {
        ts.ui.Notification.warning(inputCheck.msg)
        return false
      }
      if (!this.autoEvaluate || !this.validateTriangle(false)) return
      this.evaluateTriange([this.a.value, this.b.value, this.c.value])
    }, this.autoEvaluationTimeout)
  }

  evaluateTriange ([a, b, c]) {
    const triange = this.tEvalCb([+a, +b, +c])
    ts.ui.Notification.info('The **\u25b3** is **' + triange.type + '**\r\nThe congruent sides are: `' + triange.cong + '`')
  }

  validateTriangle (showErrors) {
    const a = this.tSideValCb(+this.a.value)
    const b = this.tSideValCb(+this.b.value)
    const c = this.tSideValCb(+this.c.value)

    if (a.isValid && b.isValid && c.isValid) {
      const t = this.tValCb([a.value, b.value, c.value])

      if (!t.isValid) {
        ts.ui.Notification.warning(t.msg)
        return false
      }

      return true
    }

    if (!a.isValid && showErrors) {
      ts.ui.Notification.warning(a.msg)
    }

    if (!b.isValid && showErrors) {
      ts.ui.Notification.warning(a.msg)
    }

    if (!c.isValid && showErrors) {
      ts.ui.Notification.warning(a.msg)
    }

    return false
  }

  tEvalCb ([a, b, c]) {
    throw new Error('not implemented: f([a, b, c])')
  }

  tSideValCb (s) {
    throw new Error('not implemented: f(int s)')
  }

  tValCb ([a, b, c]) {
    throw new Error('not implemented: f([a, b, c])')
  }
}
