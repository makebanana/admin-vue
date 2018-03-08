const fromMap = {
  'wx': '微信',
  'mt': '美团',
  'tg': '推广',
  'qt': '其他'
}

const filters = {
  returnFrom: code => {
    return fromMap[code] || ''
  }
}

export default filters
