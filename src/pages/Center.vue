<template>
  <div>
    <h1>假如我是用户列表页面,或则你打开 <a class="link-btn" @click.stop="handleOpenUserList">用户列表页面</a></h1>
    <h2>输入需要新开的页面 比如 /User/Detail.vue(path: '/user/:uid')</h2>
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
    commitUpdateTab (config) {
      this.$store.commit('updateTab', config)
    },

    handleUpdateTab () {
      let { demoId, tabName } = this

      // 当不传递 name 是，还是以 authMap 配置为准
      // 不准备 启用 名字变更，也就是了 uid 不变， name 改变
      this.commitUpdateTab({
        path: '/user/:uid',
        name: tabName,
        query: {
          uid: demoId
        }
      })
    },

    handleOpenUserList () {
      this.commitUpdateTab('/user/list')
    }
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
