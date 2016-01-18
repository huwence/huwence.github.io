"use strict"

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
  asyncGet(url) {
    var promise = new Promise(function (resolve, reject) {
      var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveObject('Microsoft.XMLHTTP')
      xmlhttp.open("GET", url)
      xmlhttp.send()
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState !== 4) return
        if (xmlhttp.status === 200) {
          resolve(xmlhttp.responseText)
        } else {
          reject(xmlhttp.status)
        }
      }
    })

    return promise
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
