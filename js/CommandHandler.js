"use strict"

var marked = require('marked')

import utils from './utils.js'
import helpers from './helpers.js'
import lang from './lang.js'
import fileHelpers from './fileHelpers.js'

// CommandHandler
class CommandHandler {
  constructor(fileRoot, viewCtrl) {
    this.fileRoot = fileRoot
    this.viewCtrl = viewCtrl
  }
  format(type, head, content) {
    type = type === 1 ? 'result' : 'command'
    return {type: type, head: head, content: content}
  }
  exec(cmd) {
    if (!cmd) {
      this.nextLine(this.pwd())
    } else {
      let cmds = cmd.split(/\s/)
      let directive = this['_' + cmds[0]]
      if (directive) {
        directive.apply(this, cmds.slice(1))
      } else {
        this.output(1, '', this.error('bash', cmds[0], lang['NoCommand']))
        this.output(2, this.pwd(), '')
        this.viewCtrl.update()
      }
    }
  }
  nextLine(head) {
    this.output(2, head || '', '')
    this.viewCtrl.update()
  }
  pwd() {
    return this.viewCtrl.currentDir.replace('/home/huwence', '~')
  }
  error(cmd, path, langMsg) {
    return cmd + ': ' + path + ': ' + langMsg
  }
  output(type, head, content) {
     this.viewCtrl.write(this.format(type, head, content))
  }
  done() {
    this.output(2, this.pwd(), '')
    this.viewCtrl.update()
  }
  _pwd() {
    let path = this.pwd()
    path = path.replace('~', '/home/huwence')
    this.output(1, '', path)
    this.done()
  }
  _ls(path) {
    let fileNode = fileHelpers.parsePath(this.fileRoot, this.viewCtrl.currentDir, path);
    if (fileNode !== null) {
      if (fileNode.isFile()) {
        this.output(1, '', fileNode.name)
      } else if (fileNode.isDir()) {
        let files = ''
        for (let file of fileNode.ofChilds()) {
          if (file !== null) {
            files += ' ' + helpers.fileTag(file.name, file.isDir() ? 'dir' : 'file')
          }
        }
        this.output(1, '', files)
      } else {
        this.output(1, '', this.error('ls', path, lang['NoSuchFile']))
      }
    } else {
      this.output(1, '', this.error('ls', path, lang['NoSuchFile']))
    }
    this.done()
  }
  _cd(path) {
    let fileNode = fileHelpers.parsePath(this.fileRoot, this.viewCtrl.currentDir, path);
    if (fileNode !== null) {
      if (fileNode.isDir()) {
        let dir = fileHelpers.getAbsolutePath(fileNode)
        this.viewCtrl.setCurrentDir(dir)
      } else {
        this.output(1, '', this.error('cd', path, lang['NoDirectory']))
      }
    } else {
      this.output(1, '', this.error('cd', path, lang['NoDirectory']))
    }
    this.done()
  }
  _cat(path) {
    let self = this
    let fileNode = fileHelpers.parsePath(this.fileRoot, this.viewCtrl.currentDir, path);
    
    if (fileNode !== null) {
      if (fileNode.isFile()) {
        self.viewCtrl.pending = true
        self.output(1, '', 'loading...')
        self.done()
        
        let url = './articles/' + fileNode.id + '.md'
        let doneFetch = function () {
          self.viewCtrl.data.splice(self.viewCtrl.data.length - 2, 1);
          self.done()
          self.viewCtrl.pending = false
        }

        helpers.asyncGet(url).then((content) => {
          self.output(1, '', marked(content))
          doneFetch()
        }, (status) => {
          self.output(1, '', lang['CatFailed'])
          doneFetch()
        })
      } else {
        self.output(1, '', this.error('cat', path, lang['NotSupport']))
        self.done()
      }
    } else {
      self.output(1, '', this.error('cat', path, lang['NoSuchFile']))
      self.done()
    }
  }
  _play() {
    this.done()
    this.viewCtrl.autoplay()
  }
  _clear() {
    this.viewCtrl.data[0] = {type: 'command', head: this.pwd(), content: ''}
    this.viewCtrl.data.splice(1, this.viewCtrl.data.length - 1)
    this.viewCtrl.update()
  }
}

export default CommandHandler
