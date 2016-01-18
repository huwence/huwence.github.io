"use strict"

import utils from './utils.js'
import helpers from './helpers.js'
import Cursor from './Cursor.js'
import TextInput from './TextInput.js'

// Console Command
class ConsoleCommandView {
  constructor(commandData, commandHandler) {
    this.commandData = commandData
    this.commandHandler = commandHandler
  }
  next() {
    this.$line = utils.element('div')
    this.$line.className = 'line'
    this.addHead()
    this.addContent()
  
    return this.$line
  }
  addHead() {
    this.$head = utils.element('div')
    this.$head.className = 'head'
    this.$head.innerHTML = this.formatHead(this.commandData.head)
    this.$line.appendChild(this.$head)
  }
  addContent() {
    this.$content = utils.element('div')
    this.$text = utils.element('span')
    this.$content.className = 'content'
    this.$text.innerHTML = utils.replaceLineBreak(this.commandData.content)
    this.$content.appendChild(this.$text)
    this.$line.appendChild(this.$content)
  }
  addCursor() {
    let self = this
    let size = helpers.measureSize(self.$content, self.commandData.content)
  
    self.headWidth = self.$head.offsetWidth
    self.lineWidth = self.$line.offsetWidth
    self.lineHeight = self.$head.offsetHeight
    self.cursor = new Cursor(self.$content)
    self.input = new TextInput(self.$content, (evtType, inputValue) => {
      self['on' + evtType] && self['on' + evtType](inputValue)
    })
    self.input.move(self.headWidth + size.width, 0)
    self.input.setVal(self.commandData.content)
  }
  onfocus() {
    this.cursor.isBlur = false
  }
  onblur() {
    this.cursor.isBlur = true
  }
  oninput(inputValue) {
    this.commandData.content = utils.replaceLineBreak(inputValue)
    let size = helpers.measureSize(this.$content, this.commandData.content)
    let offsetX = this.headWidth + size.width
    let offsetY = 0
  
    if (offsetX > this.lineWidth) {
      let row = parseInt(offsetX / this.lineWidth, 10)
      // 5px is padding-right of line content
      offsetX = offsetX % this.lineWidth + row * 5
      offsetY = row * this.lineHeight + 5
    } else {
      offsetX = this.headWidth + size.width
    }
  
    this.$text.innerHTML = this.commandData.content
    this.input.move(offsetX, offsetY)
    this.cursor.move(offsetX, offsetY)
  }
  onenter(command) {
    var cmd = utils.replaceLineBreak(command)
    this.commandHandler.exec(cmd)
  }
  formatHead(head) {
    return `guests@io.huwence.com:${head}$`
  }
}

export default ConsoleCommandView
