<template>
  <el-menu
    :default-active="activePath"
    background-color="#404040"
    text-color="rgba(255, 255, 255, 0.67)"
    active-text-color="#fff"
    @select="handleTargetTab">
    <el-submenu v-for="(item, index) in authMenus" :index="item.name" :key="item.path" v-if="item.child && item.child.length">
      <template slot="title"><i v-if="item.logo" :class="item.logo + ' nav-icon'"></i>{{item.name}}</template>
      <el-menu-item v-for="(child, i) in item.child" :index="child.path" :key="i">
        {{child.name}}
      </el-menu-item>
    </el-submenu>
    <el-menu-item :index="item.path" :key="item.path" v-else><i v-if="item.logo" :class="item.logo + ' nav-icon'"></i>{{item.name}}</el-menu-item>
  </el-menu>
</template>

<script>
import turnAuthToAllowedAndNav from '@/auth/index'

export default {
  name: 'auth-nav',

  data () {
    return {
      authMenus: []
    }
  },

  props: {
    activePath: String
  },

  methods: {

    _getAuthToNav () {
      this.$fetch({ url: '/server/auth' }).then(res => {
        let authData = turnAuthToAllowedAndNav(res.data.auth)
        this.authMenus = authData.navList
        this.$store.commit('updateAuth', authData.allowedList)
      }).catch(err => {
        console.log(err)
      })
    },

    handleTargetTab (tab) {
      this.$tab.open(tab)
    }
  },

  created () {
    this._getAuthToNav()
  }
}
</script>

<style lang="scss">
.el-menu li{
  width: 200px;
}

.el-submenu .nav-icon,
.el-menu-item .nav-icon{
  font-size: 14px;
  vertical-align: baseline;
}

.el-submenu__title{
  font-size: 13px;
  font-weight: bold;

  &:hover{
    color: #fff !important;

    i.nav-icon{
      color: #fff;
    }
  }
}
.el-menu-item{
  font-size: 12px;
  font-weight: bold;
}

.el-submenu .el-menu li:not(.is-active){
  background-color: #333 !important;
}

.el-submenu .el-menu li:hover{
  color: #fff !important;
}

.el-menu-item.is-active{
  color: #fff !important;
  background-color: #5f5f5f !important;
}
</style>
