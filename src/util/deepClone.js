function deepClone (obj) {
  let result
  let key
  if (obj && typeof obj === 'object') {
    result = typeof obj.splice === 'function' ? [] : {}
    for (key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        result[key] = deepClone(obj[key])
      } else {
        result[key] = obj[key]
      }
    }
    return result
  }
  return obj
}

export default deepClone
