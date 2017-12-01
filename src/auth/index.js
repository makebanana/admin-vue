import authConfig from './authConfig'
import navFrame from './navFrame'

// 如果不需要权限 那就直接 navList = navFrame
// 为store.auth 提供数据
export default function turnAuthToAllowedAndNav (auth = []) {
  /**
  * 目标auth 格式
  * [
  *   {
  *     name: 'useradd',
  *     parentId: 10000,
  *     id: 10001
  *   }
  * ]
  */
  let navArr = []
  let allowedArr = []
  let tempFrame = navFrame.filter(item => true)

  auth.forEach(item => {
    if (authConfig[item.id]) {
      allowedArr.push(...authConfig[item.id])
    }
  })

  navArr = tempFrame.filter(item => {
    if (item.child) {
      item.child = item.child.filter(tab => allowedArr.some(path => path === tab.path))
      return item.child.length
    }

    if (item.path) {
      return allowedArr.some(path => path === item.path)
    }
    return false
  })

  return {
    allowedList: allowedArr,
    navList: navArr
  }
}
