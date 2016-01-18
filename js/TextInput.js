"use strict"

import utils from './utils.js'

// Text Input
class TextInput {
  constructor(container, cb) {
    let $input = utils.element('textarea')

    $input.className = 'input'
    $input.setAttribute('wrap', 'off')
    $input.setAttribute('autocorrect', 'off')
    $input.setAttribute('autocapitalize', 'off')
    $input.setAttribute('spellcheck', false)
    container.appendChild($input)

    this.$input = $input
    this.bindEvent(cb)
  }
  bindEvent(cb) {
    var self = this; //webpack bug, there must be ';'
    
    ['input', 'blur', 'focus'].forEach((evtName) => {
      utils.bindEvent(self.$input, evtName, (evt) => {
        typeof cb === 'function' && cb(evtName, self.$input.value, evt)
      })
    })

    utils.bindEvent(self.$input, 'keydown', (evt) => {
      let key = evt.keyCode
      let detail = evt.detail // simulate event

      if (key === 13 || detail === 13) {
          typeof cb === 'function' && cb('enter', self.$input.value, evt)
      }
    });
  }
  move(x, y) {
    x && utils.pos(this.$input, 'left', x)
    y && utils.pos(this.$input, 'top', y)
  }
  focus() {
    this.$input.focus()
  }
  setVal(val) {
    this.$input.value = val
  }
}

export default TextInput
