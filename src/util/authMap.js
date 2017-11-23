import tabConfig from '../router/tabConfig'

// 为store.auth 提供数据
function turnAuthToNavAndAllowed (auth = []) {
  /**
  * 目标auth 格式 // 这个后台预设的情况为父子类
  * [
  *   {
  *     name: 'useradd',
  *     parentId: 10000,
  *     id: 10001
  *   }
  * ]
  */
  let navArr = []
  let allowedArr = auth.map(item => item.id)

  navArr = tabConfig.filter(item => allowedArr.some(auth => auth === item.code))
  navArr.forEach(item => {
    item.child = item.child.filter(item => allowedArr.some(auth => auth === item.code))
  })

  return {
    allowedList: allowedArr,
    navList: navArr
  }
}

export default turnAuthToNavAndAllowed
