const isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  }
};

const isString = isType('String'),
      isObject = isType('Object'),
      isNumber = isType('Number');

export {
  isType,
  isString,
  isObject,
  isNumber
}