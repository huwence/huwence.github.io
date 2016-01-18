require('./css/style.less')

import fileHelpers from './js/fileHelpers.js'
import ConsoleViewCtrl from './js/ConsoleViewCtrl.js'
import files from './data/files.js' 
import initdata from './data/init.js'

function main() {
    var container = document.getElementById('terminal')

    if (container) {
        var root = fileHelpers.parseFileData(files)
        var view = new ConsoleViewCtrl(container, initdata, root, '/home/huwence')
        view.update()
    } else {
        console.log('System Initialize failed')
    }
}

main();
