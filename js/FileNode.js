"use strict"

require('babel-polyfill')

// FileNode
class FileNode {
  constructor(id, name, type) {
    this.id = id
    this.name = name
    this.type = type
    this.firstChild = this.nextSibling = this.parentNode = null
  }
  getFileName() {
    return this.name
  }
  insert(node) {
    node.parentNode = this
    if (this.firstChild === null) {
      this.firstChild = node
    } else {
      let tmp = this.firstChild
      while (tmp.nextSibling !== null) {
        tmp = tmp.nextSibling
      }
      tmp.nextSibling = node;
    }
  }
  getDepth() {
    let count = 0
    let tmp = this
    while ((tmp = tmp.parentNode) !== null) {
      count += 1;
    }
    return count
  }
  * ofChilds() {
    let firstChild = this.firstChild
    while (firstChild !== null) {
      yield firstChild
      firstChild = firstChild.nextSibling
    }
  }
  isDir() {
    return this.type === 0
  }
  isFile() {
    return this.type === 1
  }
}

export default FileNode
