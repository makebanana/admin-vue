<template>
  <div @contextmenu.prevent="handleOpenMenus">
    <el-table
      :data="userList"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号码">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleLookDetail(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'userlist',
  data () {
    return {
      userList: []
    }
  },

  methods: {

    handleLookDetail (item) {
      let { id } = item

      this.$tab.open('/user/' + id)
    },

    handleOpenMenus (e) {
      console.log(e)
    }
  },

  created () {
    this.$fetch({
      url: '/api/user',
      data: {
        pageNo: 1,
        pageSize: 10
      }
    }).then(res => {
      this.userList = res.data.userList
    }).catch(err => {
      console.log('npm run fulldev，不可能出现哈哈哈' + err)
    })
  }
}
</script>

<style lang="scss">
 .input-wrap{
   margin: 20px 0;
   width: 400px;
 }
</style>
