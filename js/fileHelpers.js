"use strict"

import FileNode from './FileNode.js'

// file helpers
export default {
  separator: '/',
  realpath(path, currentDir) {
    if (path === this.separator) return path

    if (!path.startsWith(this.separator)) {
      path = currentDir + this.separator + path
    }
    if (path.endsWith(this.separator)) {
      path = path.substr(0, path.length - 1)
    }

    path = path.replace(/\\/g, this.separator)
    let parts = path.split(this.separator)
    let res = []
    parts.forEach((part) => {
      if (part === '..') {
        res.pop()
      } else if (part !== '.') {
        res.push(part)
      }
    })
    return res.join(this.separator)
  },
  parseFileData(data) {
    let fileNodeHash = {}
    let root = null
    data.forEach((item) => {
      let fileNode = new FileNode(item.id, item.name, item.type)
      if (item.id === 0) {
        root = fileNode
      }
      fileNodeHash[item.id] = {file: fileNode, pid: item.pid}
    })

    for (let nodeId in fileNodeHash) {
      let item = fileNodeHash[nodeId]
      if (fileNodeHash[item.pid]) {
        fileNodeHash[item.pid].file.insert(item.file)
      }
    }

    fileNodeHash = null
    return root
  },
  getFileByName(fileNode, filename) {
    let files = []

    var recursiveFind = function (fileNode, filename, files) {
      if (fileNode.name === filename) {
        files.push(fileNode)
      }

      if (fileNode.isDir()) {
        if (fileNode.isDir()) {
          let first = fileNode.firstChild
          while (first) {
            recursiveFind(first, filename, files)
            first = first.nextSibling
          }
        }
      }
    }

    recursiveFind(fileNode, filename, files)
    return files
  },
  checkPath(fileNode, parts) {
    let node = fileNode

    do {
      let last = parts.pop()
      if (node.name !== last) {
        return false
      }
    } while ((node = node.parentNode) !== null)

    return true
  },
  parsePath(root, currentDir, path) {
    let realpath
    if (path === undefined) {
      realpath = currentDir
    } else {
      path = path.replace(/~/g, '/home/huwence')
      realpath = this.realpath(path, currentDir)
    }
    let parts;
    if (realpath === this.separator) {
      parts = [this.separator]
    } else {
      parts = realpath.split(this.separator)
      if (parts[0] === '') {
        parts[0] = this.separator
      }
    }
    let filename = parts[parts.length - 1]
    let fileNodes = this.getFileByName(root, filename)
    for (let fileNode of fileNodes) {
      if (this.checkPath(fileNode, parts)) {
        return fileNode
      }
    }

    return null
  },
  getAbsolutePath(fileNode) {
    let node = fileNode
    let path = node.name

    while ((node = node.parentNode) !== null) {
      path = node.name + this.separator + path
    }

    return path.substring(1)
  }
}
