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
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="recordTotal">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'userlist',
  data () {
    return {
      userList: [],
      pageNo: 1,
      recordTotal: 0
    }
  },

  methods: {

    getList () {
      this.$fetch({
        url: '/api/user',
        data: {
          pageNo: this.pageNo,
          pageSize: 10
        }
      }).then(res => {
        this.userList = res.data.userList
        this.page = res.data.pageNo
        this.recordTotal = res.data.recordTotal
      }).catch(err => {
        console.log('npm run fulldev，不可能出现哈哈哈' + err)
      })
    },

    handleLookDetail (item) {
      let { id } = item

      this.$tab.open('/user/' + id)
    },

    handleCurrentChange (page) {
      console.log(page, this.pageNo)
      if (this.pageNo === page) { return }
      this.pageNo = page
      this.getList()
    }
  },

  created () {
    this.getList()
  }
}
</script>

<style lang="scss">
 .input-wrap{
   margin: 20px 0;
   width: 400px;
 }
</style>
