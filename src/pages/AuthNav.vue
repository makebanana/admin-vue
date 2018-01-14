<template>
  <el-menu
    :default-active="activePath"
    class="el-menu-vertical-demo"
    background-color="#404040"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleTargetTab">
    <el-submenu v-for="(item, index) in authMenus" :index="item.name" :key="item.path" v-if="item.child && item.child.length">
      <template slot="title"><i v-if="item.logo" :class="item.logo"></i>{{item.name}}</template>
        <el-menu-item v-for="(child, i) in item.child" :index="child.path" :key="i">
          {{child.name}}
        </el-menu-item>
    </el-submenu>
    <el-menu-item :index="item.path" :key="item.path" v-else>{{item.name}}</el-menu-item>
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

    getAuthToNav () {
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
    this.getAuthToNav()
  }
}
</script>

<style lang="css">
.el-menu-item.is-active{

}
</style>
