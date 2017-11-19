<template>
  <div>
    <h1>我是用户列表页面</h1>
    <h2>试试输入 input 切换之后，值是否保持（避免了 keep-alive 数据销毁的问题）</h2>
    <input type="text" name="" value="" >
  </div>
</template>

<script>
export default {
  name: 'userlist'
}
</script>

<style lang="scss">
 input{
   width: 300px;
   height: 40px;
 }
</style>
