const fromMap = {
  'wx': '微信',
  'mt': '美团',
  'tg': '推广',
  'qt': '其他'
}

const filters = {
  returnFrom: code => fromMap[code] || '',

  returnSex: code => code === 'man' ? '男' : '女',

  returnDate: str => new Date(str).toLocaleString('zh-CN', {'hour12': false}),

  returnYMD: str => {
    const tempDate = new Date(str)
    const year = tempDate.getFullYear()
    const month = tempDate.getMonth()
    const day = tempDate.getDay()
    return `${year}/${month > 10 ? '' : '0'}${month}/${day > 10 ? '' : '0'}${day}`
  }
}

export default filters
