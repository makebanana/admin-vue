<template>
  <div>
    <h1>假如我是用户列表页面,或则你打开 <a class="link-btn" @click.stop="handleOpenUserList">用户列表页面</a></h1>
    <h2>输入需要新开的页面 比如 /User/Detail.vue(path: '/user/:id')</h2>
    <div>
      <el-input placeholder="输入需要传递的id" class="input-wrap" v-model="demoId">
        <template slot="prepend">demoId</template>
      </el-input>
    </div>
    <div>
      <el-input placeholder="输入tab名称" class="input-wrap" v-model="tabName">
        <template slot="prepend">tabName</template>
      </el-input>
    </div>
    <div>
      <el-button type="primary" @click="handleUpdateTab">添加tab</el-button>
      <el-button type="primary" @click="handleUnlockTab">解除本页的锁定</el-button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'center',

  data () {
    return {
      demoId: null,
      tabName: null
    }
  },

  methods: {
    handleUpdateTab () {
      let { demoId, tabName } = this

      this.$tab.open({
        path: '/user/:id',
        name: tabName,
        query: {
          id: demoId
        }
      })
    },

    handleOpenUserList () {
      this.$tab.open('/user/list')
    },

    handleUnlockTab () {
      this.$tab.unlock()
    }
  },

  created () {

  }
}
</script>

<style lang="scss">
.link-btn{
  color: #20a0ff;
  text-decoration: underline;
  cursor: pointer;
}
 .input-wrap{
   margin: 20px 0;
   width: 400px;
 }
</style>
