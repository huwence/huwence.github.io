"use strict"

var audios = {}

// helpers
export default {
  measureSize($host, str) {
    $host = $host || document.body
  
    let node = document.createElement('div')
    node.style.width = node.style.height = 'auto'
    node.style.visibility = 'hidden'
    node.style.position = 'absolute'
    node.style.whiteSpace = 'pre'
    node.font = 'inherit'
    node.innerHTML = str
    $host.appendChild(node)
  
    let rect = node.getBoundingClientRect()
    $host.removeChild(node)
    return {
      width: rect.width,
      height: rect.height
    }
  },
  getCaretPosition($input) {
    let pos = 0
    if (document.selection) {
      $input.focus ()
      let range = document.selection.createRange()
      range.moveStart ('character', $input.value.length)
      pos = range.text.length
    } else if ($input.selectionStart || $input.selectionStart == '0') {
      pos = $input.selectionStart
    }
    return pos
  },
  syncGet(url) {
    var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveObject('Microsoft.XMLHTTP')
    xmlhttp.open("GET", url, false)
    xmlhttp.send()

    return xmlhttp.responseText
  },
  fileTag(content, type) {
    return `<b class=${type}>${content}</b>`
  },
  playAudio(url) {
    if (!this.audios) {
      this.audios = {}
    }

    let audio = this.audios[url]
    if (!audio) {
      audio = new Audio(url)
    }

    audio.play()
  }
}
