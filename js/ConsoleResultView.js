"use strict"

import utils from './utils.js'

// Console Result
class ConsoleResultView {
  constructor(resultData) {
    this.resultData = resultData
  }
  next() {
    let $line = utils.element('div')
      
    $line.className = 'line'
    this.$line = $line
    this.addContent()
  
    return $line
  }
  addContent() {
    let $content = utils.element('div')
  
    $content.className = 'result'
    $content.innerHTML = this.resultData.content
    this.$line.appendChild($content)
  }
}

export default ConsoleResultView
