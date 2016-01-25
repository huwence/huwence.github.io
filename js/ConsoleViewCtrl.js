"use strict"

import utils from './utils.js'
import helpers from './helpers.js'
import ConsoleCommandView from './ConsoleCommandView.js'
import ConsoleResultView from './ConsoleResultView.js'
import CommandHandler from './CommandHandler.js'
import Player from './Player.js'

// Console View
class ConsoleViewCtrl {
  constructor($container, data, fileRoot, initDir) {
    this.$container = $container
    this.data = data
    this.fileRoot = fileRoot
    this.currentDir = initDir
    this.commandHandler = new CommandHandler(this.fileRoot, this)
    this.bindEvent()
  }
  bindEvent() {
    var self = this
    utils.bindEvent(document.body, 'click', (evt) => {
      self.commandView.input.focus()
    })
  }
  /*
   *  Update view acrroding to model data
   *
   *  @params data {Array}
   *
   * */
  update() {
    this.gc()
    this.$container.innerHTML = ''
    if (!utils.isArray(this.data)) {
      return
    }
  
    var type, self = this
    self.data.forEach((item, index) => {
      // command is default type
      type = item.type || 'command'
  
      switch(type) {
        case 'command': 
          self.commandView = new ConsoleCommandView(item, this.commandHandler)
          self.$container.appendChild(self.commandView.next())
          break
        case 'result': 
          self.resultView = new ConsoleResultView(item)
          self.$container.appendChild(self.resultView.next())
          break
        default:
          break
      }
    })
  
    if (self.commandView) {
      self.commandView.addCursor()
      self.commandView.input.focus()
    }
  }
  handleQuery() {
    let name = helpers.getQuery('name')

    if (name) {
      name = decodeURIComponent(name)
      this.gotoArticle(name)
    }
  }
  gc() {
    if (this.commandView) delete this.commandView
    if (this.resultView) delete this.deleteView
  }
  setCurrentDir(dir) {
    this.currentDir = dir
  }
  write(data) {
    if (utils.isArray(data)) {
      this.data.concat(data)
    } else {
      this.data.push(data)
    }
  }
  autoplay() {
    let player = new Player()
    let cmds = 'clear|pwd|ls|cd article|ls|cat README|cd ~/|'.split('')
    player.start(this, cmds)
  }
  gotoArticle(name) {
    let player = new Player()
    let cmds = ('cd ~/article|cat ' + name + '|').split('')
    player.start(this, cmds, 100)
  }
}

export default ConsoleViewCtrl
