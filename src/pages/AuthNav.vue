<template>
  <el-menu :default-active="activePath" @select="handleTargetTab">
    <el-submenu v-for="(item, index) in authMenus" :index="item.path" :key="item.path" v-if="item.child.length">
      <template slot="title"><i v-if="item.logo" :class="item.logo"></i>{{item.name}}</template>
        <el-menu-item v-for="(child, i) in item.child" v-if="child.isNav"  :index="child.path" :key="i">
          {{child.name}}
        </el-menu-item>
    </el-submenu>
    <el-menu-item :index="item.path" :key="item.path" v-else>{{item.name}}</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'auth-nav',
  computed: {
    authMenus () {
      return this.$store.state.app.navList
    },

    activePath () {
      return this.$store.state.app.activePath
    }
  },
  created () {
    // console.log(this.$store.state.app)
  },
  methods: {
    handleTargetTab (index) {
      this.$store.commit('updateTab', index)
    }
  }
}
</script>

<style lang="css">
</style>
