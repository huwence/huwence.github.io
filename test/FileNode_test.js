import FileNode from '../js/FileNode.js'

var chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert

describe('FileNode', () => {
    var root, firstNode, secondNode, thirdNode, forthNode

    beforeEach(() => {
        root = new FileNode(0, '/', 0)
        firstNode  = new FileNode(1, 'home', 0)
        secondNode = new FileNode(2, 'opt', 0)
        thirdNode  = new FileNode(3, 'huwence', 0)
        forthNode  = new FileNode(4, 'README', 1)

        root.insert(firstNode)
        root.insert(secondNode)
        root.firstChild.insert(thirdNode)
        root.insert(forthNode)
    })

    it('return file name is `/`', () => {
        var fileName = root.getFileName()

        expect(fileName).to.equal('/')
    })

    it('have first node', () => {
        expect(root).to.have.a.property('firstChild')
        expect(root.firstChild.name).to.equal('home')
    })

    it('have second node', () => {
        expect(root.firstChild).to.have.a.property('nextSibling')
        expect(root.firstChild.nextSibling.name).to.equal('opt')
    })

    it('have third node', () => {
        expect(root.firstChild).to.have.a.property('firstChild')
        expect(root.firstChild.firstChild.name).to.equal('huwence')
    })

    it('have forth node', () => {
        expect(root.firstChild.nextSibling.nextSibling.name).to.equal('README')
    })

    it('get depth', () => {
        expect(root.getDepth()).to.be.equal(0)
        expect(root.firstChild.getDepth()).to.be.equal(1)
        expect(root.firstChild.nextSibling.getDepth()).to.be.equal(1)
        expect(root.firstChild.firstChild.getDepth()).to.be.equal(2)
    })

    it('iterator file tree', () => {
        for (var file of root.ofChilds()) {
            expect(file).to.have.a.property('id')
            expect(file).to.have.a.property('name')
            expect(file).to.have.a.property('type')
        }
    })

    it('assert file type', () => {
        expect(root.isDir()).to.be.equal(true)
        expect(root.isFile()).to.be.equal(false)
        expect(root.firstChild.nextSibling.nextSibling.isFile()).to.be.equal(true)
    })
})
