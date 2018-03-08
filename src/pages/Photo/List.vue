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
          <template slot="prepend">名称</template>
        </el-input>
        <PicTypeSelect
          class="select-item"
          change-on-select
          v-model="search.tid"></PicTypeSelect>
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
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleToAdd">新增相片</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="photos"
      stripe
      @sort-change="handleSortList"
      style="width: 100%">
      <el-table-column
        prop="cover"
        width="100"
        label="相片">
        <template slot-scope="scope">
          <img class="photo-list-cover" :src="scope.row.cover + '?x-oss-process=style/list'" alt=""/>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="type"
        label="分类">
      </el-table-column>
      <el-table-column
        prop="customerCount"
        sortable="custom"
        label="客户数量">
      </el-table-column>
      <el-table-column
        prop="createTime"
        sortable="custom"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button @click="handleLookDetail(scope.row)" type="primary" size="mini">
            <i class="el-icon-setting"></i>
          </el-button>
          <el-button @click="handleDel(scope.row)" type="default" size="mini">
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
import PicTypeSelect from '@/components/PicTypeSelect'

export default {
  name: 'PhotoList',

  components: {
    PicTypeSelect
  },

  data () {
    return {
      photos: [],
      recordTotal: 0,
      search: {
        tid: [],
        key: ''
      },
      ajaxData: {
        pageNo: 1,
        pageSize: 10,
        tid: '',
        key: '',
        sort: ''
      }
    }
  },

  methods: {
    _getList () {
      this.$fetch({
        url: '/server/photo',
        data: this.ajaxData
      }).then(res => {
        this.photos = res.data.photos
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

      if (prop === 'customerCount') {
        sortCode = order === 'ascending' ? 3 : 2
      }

      if (sortCode === this.ajaxData.sort) { return }

      this.ajaxData.sort = sortCode
      this._getList()
    },

    handleSearch () {
      this.ajaxData.searchType = this.search.searchType
      this.ajaxData.key = this.search.key
      this.ajaxData.tid = this.search.tid.length ? this.search.tid[this.search.tid.length - 1] : ''
      this.ajaxData.pageNo = 1
      this.ajaxData.recordTotal = 0

      this._getList()
    },

    handleResetSearch () {
      this.search.searchType = '0'
      this.search.key = ''
      this.search.tid = []
    },

    handleLookDetail ({ _id }) {
      this.$tab.open('/photo/' + _id)
    },

    handleDel ({ name, _id }) {
      this.$confirm(`确定要删除 ${name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.$fetch({
          url: '/server/photo/' + _id,
          type: 'DELETE'
        })
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this._getList()
      })
    },

    handleToAdd () {
      this.$tab.open('/photo/add')
    }
  },

  created () {
    this._getList()
  }
}
</script>

<style scoped>
.photo-list-cover{
  width: 80px;
  height: 80px;
  border: 1px solid #ddd;
}
</style>
