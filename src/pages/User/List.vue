<template>
  <div>
    <el-row class="top-control" :gutter="20">
      <el-col :span="20">
        <el-input
          size="small"
          placeholder="请输入关键字"
          class="select-input"
          name="searchType"
          v-model="search.key">
          <el-select v-model="search.searchType" slot="prepend" size="small" name="key">
            <el-option label="姓名" value="0"></el-option>
            <el-option label="手机号" value="1"></el-option>
            <el-option label="微信号" value="2"></el-option>
          </el-select>
        </el-input>
        <el-select v-model="search.from" placeholder="请选择来源" size="small" name="from">
          <el-option label="微信" value="wx"></el-option>
          <el-option label="美团" value="mt"></el-option>
          <el-option label="推广" value="tg"></el-option>
          <el-option label="其他" value="qt"></el-option>
        </el-select>
        <el-button
          class="top-searct-submit"
          type="primary"
          size="mini"
          icon="el-icon-search"
          @click="handleSearch">搜索</el-button>
        <el-button
          size="mini"
          icon="el-icon-refresh"
          @click="handleResetSearch">重置</el-button>
      </el-col>
      <el-col :span="4" class="right-box">
        <el-button type="primary" size="mini" icon="el-icon-plus">新增用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="userList"
      stripe
      @sort-change="handleSortList"
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
        prop="mobile"
        label="微信号">
      </el-table-column>
      <el-table-column
        prop="pics"
        sortable="custom"
        label="拍摄记录">
      </el-table-column>
      <el-table-column
        prop="createTime"
        sortable="custom"
        label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
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
  name: 'Userlist',

  data () {
    return {
      userList: [],
      recordTotal: 0,
      search: {
        searchType: '0',
        key: '',
        from: ''
      },
      ajaxData: {
        pageNo: 1,
        pageSize: 10,
        searchType: '0',
        key: '',
        from: '',
        sort: ''
      }
    }
  },

  methods: {

    getList () {
      this.$fetch({
        url: '/server/user',
        data: this.ajaxData
      }).then(res => {
        this.userList = res.data.userList
        this.recordTotal = res.data.recordTotal
        this.ajaxData.page = res.data.pageNo
      }).catch(err => {
        console.log('npm run fulldev，不可能出现哈哈哈' + err)
      })
    },

    handleCurrentChange (page) {
      if (this.ajaxData.pageNo === page) { return }
      this.ajaxData.pageNo = page
      this.getList()
    },

    handleSortList (data) {
      let sortCode = ''

      if (data.prop === 'createTime') {
        sortCode = data.order === 'ascending' ? 1 : ''
      }

      if (data.prop === 'pics') {
        sortCode = data.order === 'ascending' ? 3 : 2
      }

      if (sortCode === this.ajaxData.sort) { return }

      this.ajaxData.sort = sortCode
      this.getList()
    },

    handleSearch () {
      this.ajaxData.searchType = this.search.searchType
      this.ajaxData.key = this.search.key
      this.ajaxData.from = this.search.from
      this.ajaxData.pageNo = 1
      this.ajaxData.recordTotal = 0

      this.getList()
    },

    handleResetSearch () {
      this.search.searchType = '0'
      this.search.key = ''
      this.search.from = ''
    },

    handleLookDetail (item) {
      let { id } = item

      this.$tab.open('/user/' + id)
    },

    handleDel (item) {
      this.$confirm(`确定要删除 ${item.name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
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
