<template>
  <div>
    <el-row class="top-control" :gutter="20">
      <el-col :span="4" >
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleToAdd">新增管理员</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="managers"
      stripe
      @sort-change="handleSortList"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="lastLoginTime"
        sortable="custom"
        label="最后登录">
      </el-table-column>
      <el-table-column
        prop="createTime"
        sortable="custom"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button @click="handleLookDetail(scope.row)" size="mini">详情</el-button>
          <el-button @click="handleDel(scope.row)" type="danger" size="mini">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="ajaxData.pageNo"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="recordTotal">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Manager',

  data () {
    return {
      managers: [],
      recordTotal: 0,
      ajaxData: {
        pageNo: 1,
        pageSize: 10,
        sort: ''
      }
    }
  },

  methods: {

    _getList () {
      this.$fetch({
        url: '/server/manager',
        data: this.ajaxData
      }).then(res => {
        this.managers = res.data.managers
        this.recordTotal = res.data.recordTotal
        this.ajaxData.page = res.data.pageNo
      })
    },

    handleCurrentChange (page) {
      if (this.ajaxData.pageNo === page) { return }
      this.ajaxData.pageNo = page
      this._getList()
    },

    handleSortList ({ prop, order }) {
      let sortCode = ''

      if (prop === 'createTime') {
        sortCode = order === 'ascending' ? 1 : ''
      }

      if (prop === 'lastLoginTime') {
        sortCode = order === 'ascending' ? 3 : 2
      }

      if (sortCode === this.ajaxData.sort) { return }

      this.ajaxData.sort = sortCode
      this._getList()
    },

    handleLookDetail ({ _id }) {
      this.$tab.open('/manager/' + _id)
    },

    handleDel ({ name, _id }) {
      this.$confirm(`确定要删除管理员 ${name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.$fetch({
          url: '/server/manager/' + _id,
          type: 'DELETE'
        })
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.$tab.reload()
      })
    },

    handleToAdd () {
      this.$tab.open('/manager/add')
    }
  },

  created () {
    this._getList()
  }
}
</script>
