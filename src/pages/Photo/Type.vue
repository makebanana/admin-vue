<template>
  <div style="position: relative;">
    <el-row class="top-control" :gutter="20">
      <el-col :span="4" >
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleOpenEditor({})">新增大类</el-button>
      </el-col>
    </el-row>
    <div class="flex-box">
      <el-card class="type-card" v-for="parent in list" :key="parent.id">
        <div slot="header" class="clearfix">
          <span>{{parent.label}}</span>

          <el-tooltip content="删除大分类" placement="top">
            <i class="el-icon-delete" style="float: right; margin-left: 10px;" @click="handleDel(parent)"></i>
          </el-tooltip>
          <el-tooltip content="编辑大分类" placement="top">
            <i class="el-icon-edit" style="float: right; margin-left: 10px;" @click="handleOpenEditor(parent)"></i>
          </el-tooltip>
          <el-tooltip content="新增一个小分类" placement="top">
            <i class="el-icon-circle-plus-outline" style="float: right;" @click="handleOpenEditor({ parentId: parent.id })"></i>
          </el-tooltip>
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
              <td>{{type.count}}</td>
              <td>
                <el-tooltip content="编辑分类" placement="top">
                  <i class="el-icon-edit" @click="handleOpenEditor(type)"></i>
                </el-tooltip>
                <el-tooltip content="删除分类" placement="top">
                  <i class="el-icon-delete" @click="handleDel(type)"></i>
                </el-tooltip>
              </td>
            </tr>
          </tbody>
        </table>

      </el-card>
    </div>

    <el-dialog
      :title="tempType.id ? '编辑分类' : '新增分类'"
      :visible.sync="isOpenEditor"
      width="300px">
      <el-form :model="tempType">
        <el-input v-model="tempType.label" auto-complete="off" placeholder="分类名称"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOpenEditor = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'PhotoType',

  data () {
    return {
      isOpenEditor: false,
      tempType: {}
    }
  },

  computed: {
    list () {
      return this.$store.state.picType.list
    }
  },

  methods: {

    _add (parentId = 0, label) {
      this.$store.dispatch('addType', {
        parentId,
        label
      }).then(() => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.isOpenEditor = false
      })
    },

    _edit (id, label) {
      this.$store.dispatch('editType', {
        id,
        label
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.isOpenEditor = false
      })
    },

    handleOpenEditor ({ id = 0, parentId = 0, label }) {
      this.tempType = {
        id,
        parentId,
        label
      }
      this.isOpenEditor = true
    },

    handleSubmit () {
      if (!this.tempType.label) {
        this.$message({
          type: 'error',
          message: '请填写分类名称!'
        })
        return
      }

      if (this.tempType.id) {
        this._edit(this.tempType.id, this.tempType.label)
      } else {
        this._add(this.tempType.parentId, this.tempType.label)
      }
    },

    handleDel (item) {
      this.$confirm(`确定要删除 ${item.label}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.$store.dispatch('delType', item.id)
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    }
  },

  created () {
    this.$store.dispatch('getType')
  }
}
</script>

<style lang="scss">
.el-input__inner{
  width: 100%;
}
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
