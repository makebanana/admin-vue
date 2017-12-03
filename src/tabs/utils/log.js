export function assert (condition, message) {
  if (!condition) {
    throw new Error(('[vue-pathtab] ' + message))
  }
}

export function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(('[vue-pathtab] ' + message))
  }
}

export function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}
