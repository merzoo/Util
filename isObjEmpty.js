/**
 * 检测一个对象是否为空，不含继承
 * @param {obj} target 
 */
function isObjEmpty(target) {
  if (target == null) {
    return true
  } 
  if(Object.keys) {
    return Object.keys(target).length === 0
  }
  for (const key in target) {
    if(hasOwnProperty.call(target, key)){
      return false
    }
    return true
  }
}

module.exports = isObjEmpty

