"use strict"

class Player {
    constructor() {
        this.inputEvent = new CustomEvent('input')
        this.enterEvent = new CustomEvent('keydown', {detail: 13})
        this.timer = null
    }
    start(viewCtrl, cmds, interval=230) {
        var self = this
        if (cmds.length === 0) {
          return
        }

        self.timer = setTimeout(() => {
            let $textInput = viewCtrl.commandView.input.$input
            if (!viewCtrl.pending) {
              let letter = cmds.shift();
              if ('|' === letter) {
                  self.dispatch($textInput, self.enterEvent)
              } else {
                  $textInput.value += letter
                  self.dispatch($textInput, self.inputEvent)
              }
            }
            self.start(viewCtrl, cmds)
        }, interval)
    }
    stop() {
        clearTimeout(this.timer)
    }
    dispatch($textInput, evt) {
        $textInput.dispatchEvent(evt)
    }
}
export default Player
