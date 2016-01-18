"use strict"

import utils from './utils.js'

// Cursor
class Cursor {
  constructor($container) {
    var $cursor = utils.element('span')

    $cursor.className = 'cursor'
    $container.appendChild($cursor)

    this.$cursor = $cursor
    this.isBlur = false
    this.inputing = false
    this.left = 0
    this.flashing()
  }
  move(x, y) {
    this.left = x
    x && utils.pos(this.$cursor, 'left', x)
    y && utils.pos(this.$cursor, 'top', y)
  }
  flashing() {
    var self = this,
        computedStyle = getComputedStyle(self.$cursor),
        left = parseInt(computedStyle.left, 10),
        opacity = computedStyle.opacity

    if (isNaN(left)) {
        left = 0
    }

    setTimeout(() => {
      if (self.isBlur) {
        self.$cursor.style.opacity = 1
        utils.addClass(self.$cursor, 'blur')
      } else {
        utils.removeClass(self.$cursor, 'blur')
        if (left === parseInt(self.left, 10)) {
            self.$cursor.style.opacity = opacity ^ 1
        } else {
            self.$cursor.style.opacity = 1
        }
      }
      self.flashing()
    }, 350)
  }
}

export default Cursor
