function formateString (str, data) {
  return str.replace(/\{(\w+)\}/g, function (match, key) {
    return data[key] || ''
  })
}

export default formateString
