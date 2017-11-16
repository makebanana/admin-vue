<template>
  <el-container class="big-wrap">
    <el-aside width="200px"  class="side-wrap">
      <el-menu :default-openeds="['1']">
        <el-submenu v-for="(item, index) in authMenus" :index="index + 1 + ''" :key="index" v-if="item.child.length">
          <template slot="title"><i v-if="item.logo" :class="item.logo"></i>{{item.name}}</template>
            <el-menu-item v-for="(child, i) in item.child" :index="index + '-' + i" :key="i">{{child.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="index + 1 + ''" v-else>{{item.name}}</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header-wrap">
        <el-dropdown @command="handleHeaderCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="a">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      authMenus: [
        {
          id: 10000,
          name: '用户管理',
          logo: 'el-icon-mobile-phone',
          child: [
            {
              id: 10001,
              name: '新增用户'
            },
            {
              id: 10003,
              name: '用户列表'
            }
          ]
        },
        {
          id: 40000,
          name: '版本管理',
          logo: 'el-icon-tickets',
          child: [
            {
              id: 40001,
              name: '新增版本'
            }
          ]
        },
        {
          id: 90000,
          name: '系统配置',
          logo: 'el-icon-setting',
          child: []
        }
      ]
    }
  },
  created () {
    // 获取该用户 拥有的管理权限
    // this.$fetch().then().catch()
    // 首次加载如何判断侧边栏展开命中是个问题，问题前提是登录之后回到最初访问页 而不是默认首页
  },
  methods: {
    handleHeaderCommand () {
      console.log(123)
      sessionStorage.setItem('V_accessToken', '')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped lang="scss">
  .big-wrap{
    min-height: 100vh;

    .side-wrap{
      padding-top: 20px;
      background-color: #333346;
    }

    .header-wrap{
      padding-top: 20px;
      text-align: right;
      background-color: #ececec;
    }
  }

</style>
