import test from 'tape'
import dotPath from '../src/index'

const obj = {
  one: {
    two: {
      three: {
        four: 1
      }
    }
  }
}

const existPrimitive = 'one.two.three.four'
const existObject = 'one.two.three'
const rootNotExist = 'rootNotExist'
const notExist = 'one.notExist'
const allNotExist = 'allNotExist.allNotExist'

test('exist direct', function(t) {
  t.equal(dotPath(existPrimitive, obj), 1)

  t.end()
})
test('existObject direct', function(t) {
  t.deepEqual(dotPath(existObject, obj), {four:1})

  t.end()
})
test('exist curry', function(t) {
  t.equal(dotPath(existPrimitive)(obj), 1)

  t.end()
})
test('exist get', function(t) {
  t.equal(dotPath(existPrimitive).get(obj), 1)

  t.end()
})
test('exist set', function(t) {
  const ldata = JSON.parse(JSON.stringify(obj))
  dotPath(existPrimitive).set(ldata, 2)
  t.equal(ldata.one.two.three.four, 2)

  t.end()
})
test('exist delete', function(t) {
  const ldata = JSON.parse(JSON.stringify(obj))
  dotPath(existPrimitive).delete(ldata)
  t.false(ldata.one.two.three.hasOwnProperty('four'))

  t.end()
})

test('rootNotExist direct', function(t) {
  t.equal(dotPath(rootNotExist, obj), undefined)

  t.end()
})
test('rootNotExist set', function(t) {
  const ldata = JSON.parse(JSON.stringify(obj))
  dotPath(rootNotExist).set(ldata, 2)
  t.equal(ldata.rootNotExist, 2)

  t.end()
})
test('rootNotExist delete', function(t) {
  const ldata = JSON.parse(JSON.stringify(obj))
  dotPath(rootNotExist).delete(ldata)
  t.deepEqual(ldata, obj)

  t.end()
})

test('notExist direct', function(t) {
  t.equal(dotPath(notExist, obj), undefined)

  t.end()
})
test('notExist set', function(t) {
  const ldata = JSON.parse(JSON.stringify(obj))
  dotPath(notExist).set(ldata, 2)
  t.equal(ldata.one.notExist, 2)

  t.end()
})
test('notExist delete', function(t) {
  const ldata = JSON.parse(JSON.stringify(obj))
  dotPath(notExist).delete(ldata)
  t.false(ldata.one.hasOwnProperty('notExist'))

  t.end()
})

test('allNotExist direct', function(t) {
  t.equal(dotPath(allNotExist, obj), undefined)

  t.end()
})
test('allNotExist set', function(t) {
  const ldata = JSON.parse(JSON.stringify(obj))
  dotPath(allNotExist).set(ldata, 2)
  t.deepEqual(ldata, obj)

  t.end()
})
test('allNotExist delete', function(t) {
  const ldata = JSON.parse(JSON.stringify(obj))
  dotPath(allNotExist).delete(ldata)
  t.deepEqual(ldata, obj)

  t.end()
})