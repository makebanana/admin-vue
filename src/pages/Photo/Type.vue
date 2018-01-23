<template>
  <div>
    <el-row class="top-control" :gutter="20">
      <el-col :span="4" >
        <el-button type="primary" size="mini" icon="el-icon-plus">新增大类</el-button>
      </el-col>
    </el-row>
    <div class="flex-box">
      <el-card class="type-card" v-for="parent in list" :key="parent.id">
        <div slot="header" class="clearfix">
          <span>{{parent.label}}</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <table class="type-table">
          <thead>
            <tr>
              <th>分类名</th>
              <th>相片数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="type in parent.children" :key="type.id" class="text item">
              <td>{{type.label}}</td>
              <td>{{type.count}}1</td>
              <td>
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </td>
            </tr>
          </tbody>
        </table>

      </el-card>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Userlist',

  data () {
    return {
      isOpenEditor: false
    }
  },

  computed: {
    list () {
      return this.$store.state.picType.list
    }
  },

  methods: {

    handleOpenEditor ({ id = 0, label }) {
      this.isOpenEditor = true
    },

    handleCloseEditor () {

    },

    handleAdd (label, parentId = 0) {
      this.$state.dispatch('addType', {
        parentId,
        label
      })
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
    this.$store.dispatch('getType')
  }
}
</script>

<style lang="scss">
.type-card{
  margin-right: 30px;
  margin-bottom: 30px;
  width: 350px;
}
.type-table{
  width: 100%;
  border-spacing: 0;
  text-align: left;

  thead tr{
    height: 36px;
    background-color: #f1f8ff;

    th:last-child{
      width: 70px;
      text-align: right;
    }
  }


  tbody tr{
    height: 36px;

    &:nth-child(even){
      background-color: #FAFAFA
    }

    &:hover{
      background-color: #f6f8fa;
    }

    td:last-child{
      text-align: right;

      i{
        cursor: pointer;

        &:hover{
          color: #20a0ff;
        }

        &:first-child{
          margin-right: 10px;
        }
      }
    }
  }

  th,
  td{
    padding: 0 5px;
  }
}
</style>
