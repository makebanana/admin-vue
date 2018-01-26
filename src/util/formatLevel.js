// 数据规范化  type只有两层
export default function formatList (data) {
  let list = []
  let listMap = {}
  data.forEach(item => {
    if (item.parentId === 0) {
      if (listMap[item.id]) {
        item.children = listMap[item.id][0].children
        list[listMap[item.id][0]] = item
      } else {
        item.children = []
        list.push(item)
        listMap[item.id] = [list.length - 1]
      }
    } else {
      let map = listMap[item.parentId]
      if (!map) {
        list.push({
          children: [item]
        })
        listMap[item.parentId] = [list.length - 1]
        listMap[item.id] = [list.length - 1, 0]
      } else {
        list[map[0]].children.push(item)
        listMap[item.id] = [map[0], list[map[0]].children.length - 1]
      }
    }
  })
  return [list, listMap]
}
