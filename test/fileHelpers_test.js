import FileNode from '../js/FileNode.js'
import fileHelpers from '../js/fileHelpers.js'
import files from '../data/files.js'

var chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert

describe('fileHelpers', () => {
    var root

    beforeEach(() => {
        root = fileHelpers.parseFileData(files)
    })

    it('realpath', () => {
        var path = '/a/b/../', 
            currentDir = '/home/huwence'

        expect(fileHelpers.realpath(path, currentDir))
            .to.equal('/a')

        path = 'a'
        expect(fileHelpers.realpath(path, currentDir))
            .to.equal('/home/huwence/a')

        path = '/a/c/d/../../f'
        expect(fileHelpers.realpath(path, currentDir))
            .to.equal('/a/f')

        path = '../../a/b/c/d'
        expect(fileHelpers.realpath(path, currentDir))
            .to.equal('/a/b/c/d')

        path = '/a/b/./d/../e/f'
        expect(fileHelpers.realpath(path, currentDir))
            .to.equal('/a/b/e/f')

        path = '/'
        expect(fileHelpers.realpath(path, currentDir))
            .to.equal('/')
    })

    it('parseFileData', () => {
        expect(root.name).to.equal('/')
        expect(root.firstChild.name).to.equal('home')
        expect(root.firstChild.firstChild.name).to.equal('huwence')
        expect(root.firstChild.firstChild.firstChild.name).to.equal('article')
        expect(root.firstChild.firstChild.firstChild.firstChild.name).to.equal('北京的夏')
        expect(root.firstChild.firstChild.firstChild.firstChild.nextSibling.name).to.equal('README')
    })

    it('getFileByName', () => {
        var files = fileHelpers.getFileByName(root, 'huwence')
        assert.typeOf(files, 'array')
        expect(files[0].name).to.equal('huwence')

        files = fileHelpers.getFileByName(root, 'article')
        expect(files[0].name).to.equal('article')
    })

    it('checkPath', () => {
        var node = root.firstChild.firstChild.firstChild
        var checkResult = fileHelpers.checkPath(node, ['/', 'home', 'huwence', 'article'])
        expect(checkResult).to.equal(true)

        checkResult = fileHelpers.checkPath(node, ['/', 'home', 'huwence'])
        expect(checkResult).to.equal(false)
    })

    it('parsePath', () => {
        var fileNode = fileHelpers.parsePath(root, '/home/huwence')
        expect(fileNode.name).to.equal('huwence')

        fileNode = fileHelpers.parsePath(root, '/home/huwence/article', '..')
        expect(fileNode.name).to.equal('huwence')

        fileNode = fileHelpers.parsePath(root, '/home/huwence/article', '.')
        expect(fileNode.name).to.equal('article')

        fileNode = fileHelpers.parsePath(root, '/home/huwence/article', '../')
        expect(fileNode.name).to.equal('huwence')

        fileNode = fileHelpers.parsePath(root, '/home/huwence/article', '~')
        expect(fileNode.name).to.equal('huwence')

        fileNode = fileHelpers.parsePath(root, '/home/huwence/article', '/opt')
        expect(fileNode.name).to.equal('opt')

        fileNode = fileHelpers.parsePath(root, '/home/huwence/article', 'opt')
        expect(fileNode).to.equal(null)

        fileNode = fileHelpers.parsePath(root, '/home/huwence/article', '/home/')
        expect(fileNode.name).to.equal('home')

        fileNode = fileHelpers.parsePath(root, '/home/huwence/article', '/home')
        expect(fileNode.name).to.equal('home')

        fileNode = fileHelpers.parsePath(root, '/home/huwence/article', '/')
        expect(fileNode.name).to.equal('/')
    })

    it('getAbsolutePath', () => {
        var path = fileHelpers.getAbsolutePath(root.firstChild.firstChild)
        expect(path).to.equal('/home/huwence')

        path = fileHelpers.getAbsolutePath(root.firstChild.firstChild.firstChild.nextSibling)
        expect(path).to.equal('/home/huwence/about')

        path = fileHelpers.getAbsolutePath(root.firstChild.firstChild.firstChild.firstChild.nextSibling)
        expect(path).to.equal('/home/huwence/article/README')
    })
})
