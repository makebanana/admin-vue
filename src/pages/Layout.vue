<template>
  <el-container class="big-wrap">
    <el-aside width="200px"  class="side-wrap">
      <div class="side-logo">logo</div>
      <AuthNav />
    </el-aside>
    <el-container>
      <el-header class="header-wrap">
        <el-dropdown @command="handleHeaderCommand" class="logout-btn">
          <i class="el-icon-setting"></i>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="a">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main-wrap">
        <el-tabs
          class="min100height"
          v-model="activePath"
          tab-position="top"
          type="border-card"
          @tab-remove="handleDelTabs"
          @tab-click="handleTabClick">
          <el-tab-pane name="/">
            <span slot="label">首页</span>
            <Center/>
          </el-tab-pane>
          <el-tab-pane
            class="min100height"
            v-for="(item, index) in tabList"
            :key="item.path"
            :label="item.name"
            :name="item.path"
            closable>
              <el-breadcrumb class="breadcrumb"  v-if="item.breadcrumb && item.breadcrumb.length">
                <el-breadcrumb-item v-for="crumb in item.breadcrumb" :key="crumb">{{crumb}}</el-breadcrumb-item>
              </el-breadcrumb>
              <div class="tab-control-box" v-loading="item.reloading">
                <a @click.stop="handleDelTabs(item.path)">关闭</a>
                <a @click.stop="handleReloadTab(index)">刷新</a>
                <a @click.stop="handleCloseOther(index)">关闭其他</a>
              </div>
              <div v-if="!item.reloading" :is="item.component" :query="item.query"> </div>
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
    },

    // 刷新一个tabs
    handleReloadTab (index) {
      this.$store.commit('reloadTab', index)
    },

    // 关闭其他
    handleCloseOther (index) {
      this.$store.commit('closeOtherTab', index)
    }
  }
}
</script>

<style scoped lang="scss">
  .big-wrap{
    min-height: 100vh;

    .side-wrap{
      background-color: #404040;

      .side-logo{
        width: 200px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
      }
    }

    .header-wrap{
      position: relative;
      text-align: right;
      background-color: #404040;

      .logout-btn{
        position: absolute;
        top: 25px;
        right: 15px;

        i{
          color: #fff;
        }
      }
    }

    .main-wrap{
      padding: 10px;
      background-color: #ececec;

      .breadcrumb{
        margin-bottom: 10px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e3e3e3;
      }

      .min100height{
        min-height: 100%;
      }

      .tab-control-box{
        position: absolute;
        right: 30px;
        top: 20px;
        display: flex;
        font-size: 14px;
        font-weight: bold;
        text-align: center;

        a{
          margin-left: 10px;
          cursor: pointer;

          &:hover{
            text-decoration: underline;
            color: #20a0ff;
          }
        }
      }
    }
  }

</style>
