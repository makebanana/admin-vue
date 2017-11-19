<template>
  <el-container class="big-wrap">
    <el-header class="header-wrap">
      <div class="side-logo">logo</div>
      <el-dropdown @command="handleHeaderCommand" class="logout-btn">
        <i class="el-icon-setting"></i>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item command="a">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="200px"  class="side-wrap">
        <AuthNav />
      </el-aside>
      <el-main>
        <el-tabs
          v-model="activePath"
          tab-position="top"
          type="card"
          @tab-remove="handleDelTabs"
          @tab-click="handleTabClick">
          <el-tab-pane name="/">
            <span slot="label">首页</span>
            <Center/>
          </el-tab-pane>
          <el-tab-pane
            v-for="item in tabList"
            :key="item.path"
            :label="item.name"
            :name="item.path"
            closable>
              <div :is="item.component"> </div>
            </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Center from './Center'
import AuthNav from './AuthNav'

// need to do, keep alive tab
export default {
  name: 'index',
  data () {
    return {

    }
  },
  computed: {
    activePath: {
      get () {
        return this.$store.state.app.activePath
      },
      set (val) {
        this.$store.commit('updateActivePath', val)
      }
    },
    tabList () {
      return this.$store.state.app.tabsList
    }
  },
  components: {
    Center,
    AuthNav
  },
  created () {
    // console.log(this.$store)
  },
  methods: {
    // 退出管理系统
    handleHeaderCommand () {
      this.$store.commit('userLogout')
      this.$router.push({ name: 'login' })
    },

    // 切换tab
    handleTabClick (path) {
      // console.log(path)
    },

    // 删除一个tabs
    handleDelTabs (path) {
      this.$store.commit('removeTab', path)
    }
  }
}
</script>

<style scoped lang="scss">
  .big-wrap{
    min-height: 100vh;

    .side-wrap{
      background-color: #333346;
    }

    .header-wrap{
      position: relative;
      text-align: right;
      background-color: #333346;

      .side-logo{
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
      }

      .logout-btn{
        position: absolute;
        top: 25px;
        right: 15px;

        i{
          color: #fff;
        }
      }
    }
  }

</style>
