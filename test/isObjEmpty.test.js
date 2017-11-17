const isObjEmpty = require('../isObjEmpty.js')
const expect = require('chai').expect

describe('对象是否为空的测试', function(){
  const superObj = {name: 'merzoo'}
  const subObj = Object.create(superObj)

  it('{} 应该为空', function() {
    expect(isObjEmpty({})).to.be.ok
  })

  it('{a: 1} 应该不为空', function() {
    expect(isObjEmpty({a: 1})).to.not.be.ok
  })

  it('subObj 应该为空', function() {
    expect(isObjEmpty(subObj)).to.be.ok
  })
})
