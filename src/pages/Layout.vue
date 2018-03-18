<template>
  <el-container class="big-wrap">
    <el-aside width="200px"  class="side-wrap">
      <div class="side-logo">
        <div></div>
      </div>
      <AuthNav :activePath="activePath" />
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
        <path-tabs-view className="min100height" v-model="activePath" defaultPath="/user/list"></path-tabs-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AuthNav from './AuthNav'

export default {
  name: 'index',

  data () {
    return {
      activePath: ''
    }
  },

  components: {
    AuthNav
  },

  methods: {
    // 退出管理系统
    handleHeaderCommand () {
      this.$store.commit('userLogout')
      location.href = '/'
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
        padding: 15px 20px;
        width: 200px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;

        div{
          width: 160px;
          height: 30px;
          background-color: #333;
          border-radius: 4px;
        }
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
      flex-basis: 100%;

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
