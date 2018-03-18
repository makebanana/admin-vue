<template>
  <div>
    <el-form :model="manager" :rules="rules" ref="manager" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="manager.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="manager.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="manager.password" placeholder="请输入微信号"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="auth">
        <div class="auth-wrap">
            <div v-for="(item, index) in authList" :key="item.name">
              <el-checkbox class="check-bigone" v-model="item.checked" @change="handleCheckAllChange(index)">{{ item.label }}</el-checkbox>
              <div v-if="item.children.length">
                <el-checkbox
                  v-for="child in item.children"
                  v-model="child.checked"
                  :label="child.lable"
                  :key="child.name"
                  @change="hangleCheckChild(index)">
                  {{child.label}}
                </el-checkbox>
              </div>
            </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('manager')">立即创建</el-button>
        <el-button @click="resetForm('manager')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import formatLevel from '@/util/formatLevel'
import md5 from 'js-md5'

export default {
  name: 'ManagerAdd',

  data () {
    const validateMobile = (rule, value, callback) => {
      if (!/^1[345678]\d{9}$/.test(value)) {
        callback(new Error('请正确的手机号'))
      } else {
        callback()
      }
    }

    const validateAuth = (rule, value, callback) => {
      return value.length ? callback() : callback(new Error('请分配权限'))
    }

    return {
      manager: {
        name: '',
        mobile: '',
        password: '',
        auth: []
      },
      authList: [],
      rules: {
        name: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        mobile: [{ required: true, validator: validateMobile, trigger: 'blur' }],
        password: [{ required: true, min: 3, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }],
        auth: [{ required: true, validator: validateAuth, trigger: 'blur' }]
      }
    }
  },

  methods: {
    _getAuthList () {
      this.$fetch({
        url: '/server/auth/list'
      }).then(res => {
        this.authList = formatLevel(res.data.auth)[0]
      })
    },

    _filterChecked () {
      this.authList.forEach(item => {
        if (item.checked) {
          this.manager.auth.push(item._id)
        }

        item.children && item.children.forEach(child => {
          if (child.checked) {
            this.manager.auth.push(child._id)
          }
        })
      })
    },

    handleCheckAllChange (index) {
      this.authList[index].children.forEach(item => { item.checked = this.authList[index].checked })
      this._filterChecked()
    },

    hangleCheckChild (index) {
      this.authList[index].checked = this.authList[index].children.every(item => item.checked)
      this._filterChecked()
    },

    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) { return false }

        const data = {
          ...this.manager,
          password: md5(this.manager.password)
        }
        this.$fetch({
          url: '/server/manager',
          type: 'POST',
          data: data
        }).then(res => {
          this.$tab.close()
          this.$tab.open('/manager')
          this.$tab.reload('/manager')
        })
      })
    },

    resetForm (formName) {
      this.authList.forEach(item => {
        item.checked = false
        item.children && item.children.forEach(child => {
          child.checked = false
        })
      })
      this.$refs[formName].resetFields()
    }
  },

  created () {
    this._getAuthList()
  }
}
</script>

<style lang="scss" scoped>
.auth-wrap{
  width: 360px;

  & > div{
    margin-bottom: 10px;
    padding-left: 10px;
    border: 1px solid #ddd;

    .check-bigone{
      border-bottom: 1px solid #DDD;

      .el-checkbox__label{
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}

</style>
