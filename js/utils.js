"use strict"

// utils
export default {
  id(id) {
    return document.getElementById(id)
  },
  element(tag) {
    return document.createElement(tag)
  },
  addClass(element, className) {
    element && element.classList.add(className)
  },
  removeClass(element, className) {
    element && element.classList.remove(className)
  },
  toggleClass(element, className, bool) {
    element && element.classList.toggle(className, bool)
  },
  pos(element, attr, val) {
    element && attr && (element.style[attr] = val + 'px')
  },
  bindEvent(element, evt, fn) {
    element && element.addEventListener(evt, fn, false)
  },
  isArray(array) {
    return Object.prototype.toString.call(array) === '[object Array]'
  },
  isString(str) {
    return Object.prototype.toString.call(str) === '[object String]'
  },
  replaceLineBreak(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, '')
  },
  nl2br(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, '<br>')
  }
}
