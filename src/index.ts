export interface accessor {
  (obj):any
  get:(obj) => any
  set:(obj, value) => void
  delete:(obj) => boolean
}

/**
 * generate an dot access function for specified path
 *
 * 生成一个使用点操作符访问对应路径数据的访问器
 *
 * @param {string} pathStr path string defined with dot access
 * @param {any} obj
 * @returns {(obj) => any | any}
 */
function dotPath(pathStr:string):accessor;
function dotPath(pathStr:string, obj:any):any;
function dotPath(pathStr:string, obj?:any):accessor | any {
  if (typeof pathStr !== 'string') throw new Error('path must be string.')

  const path = pathStr.split('.')
  function fun(obj, cb) {
    let current = obj
    let parent
    let propName
    for (const prop of path) {
      parent = current
      propName = prop
      if (current !== undefined) {
        current = current[prop]
      }
      if (parent === undefined) {
        propName = undefined
        break
      }
    }

    cb(parent, propName)
  }

  function access(obj) {
    let ret
    fun(obj, (o, p) => ret = p ? o[p] : o)
    return ret
  }

  access['get'] = (obj) => {
    let ret
    fun(obj, (o, p) => ret = p ? o[p] : o)
    return ret
  }

  access['set'] = (obj, value) => fun(obj, (o, p) => {if (p) o[p] = value})

  access['delete'] = (obj) => fun(obj, (o, p) => {if (o) delete o[p]})

  if (obj) {
    return access(obj)
  } else {
    return access
  }
}

export default dotPath