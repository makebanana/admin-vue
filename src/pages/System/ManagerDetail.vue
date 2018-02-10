<template>
  <el-row :gutter="20">
    <el-col :span="14">
      <div v-show="!isEdit" class="info-wrap">
        <h3>{{manager.name}}</h3>
        <p>手机号: <span>{{manager.mobile}}</span></p>
        <p>最后登陆: <span>{{manager.lastLoginTime}}</span></p>
        <p>IP地址: <span>{{manager.ip}}</span></p>
        <p>创建时间: <span>{{manager.createTime}}</span></p>
        <div>
          权限:
          <div class="auth-list" v-for="auth in manager.auth" :key="auth.name">
            <h4>{{auth.label}}</h4>
            <div v-if="auth.children">
              <span v-for="child in auth.children"> {{child.label}}</span>
            </div>
          </div>
        </div>
        <el-button class="edit-btn" @click="handleOpenAndCloseEdit">编辑</el-button>
      </div>
      <div v-show="isEdit" class="form-wrap" >
        <el-form :model="tempManager" :rules="rules" ref="manager" label-width="100px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="tempManager.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="tempManager.mobile" disabled placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="tempManager.password" placeholder="请输入微信号"></el-input>
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
            <el-button type="primary" @click="submitForm('manager')">提交</el-button>
            <el-button @click="handleOpenAndCloseEdit">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import formatLevel from '@/util/formatLevel'
import md5 from 'js-md5'

export default {
  name: 'ManagerDetail',

  data () {
    let validateMobile = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error('请正确的手机号'))
      } else {
        callback()
      }
    }

    let validateAuth = (rule, value, callback) => {
      return value.length ? callback() : callback(new Error('请分配权限'))
    }

    return {
      id: null,
      manager: {},
      tempManager: {},
      authList: [],
      isEdit: false,
      rules: {
        name: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: validateMobile, trigger: 'blur' }
        ],
        password: [
          { required: true, min: 3, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        auth: [
          { required: true, validator: validateAuth, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {

    _getDetail () {
      let { id } = this.$tab.params
      this.id = id
      this.$fetch({
        url: '/server/manager/' + id
      }).then(res => {
        this.tempManager = {
          ...res.data.manager,
          auth: res.data.manager.auth.map(auth => auth._id)
        }
        this.manager = {
          ...res.data.manager,
          auth: formatLevel(res.data.manager.auth)[0]
        }
        this.$tab.setTitle(`管理员详情: ${res.data.manager.name}`)
        this._getAuthList()
      })
    },

    _getAuthList () {
      this.$fetch({
        url: '/server/auth/list'
      }).then(res => {

        this.tempManager.auth.forEach(selectId => {
          res.data.auth.some((auth) => {
            if (auth._id === selectId) {
              auth.checked = true
              return true
            }
          })
        })

        this.authList = formatLevel(res.data.auth)[0]
      })
    },

    _filterChecked () {
      this.authList.forEach(item => {
        if (item.checked) {
          this.tempManager.auth.push(item._id)
        }

        item.children && item.children.forEach(child => {
          if (child.checked) {
            this.tempManager.auth.push(child._id)
          }
        })
      })
    },

    handleOpenAndCloseEdit () {
      this.isEdit = !this.isEdit
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
          password: md5(this.tempManager.password),
          ...this.tempManager
        }
        this.$fetch({
          url: '/server/manager/' + this.id,
          type: 'PUT',
          data: data
        }).then(res => {
          this.$tab.reload()
        })
      })
    }
  },

  created () {
    this._getDetail()
  }
}
</script>

<style lang="scss">
.input-wrap{
  margin: 20px 0;
  width: 400px;
}
.info-wrap{
  min-width: 300px;
  padding: 20px 40px;
  border: 1px solid #ddd;

  p{
    margin: 10px 0 20px;

    span{
      font-weight: bold;
    }
  }

  .auth-list{
    margin-top: 10px;
    margin-left: 40px;
  }

  .edit-btn{
    margin-top: 40px;
  }
}
.el-form{
  margin-top: 0;

  .el-form-item__content{
    margin-left: 0;
  }
}
.form-wrap{
  margin-top: 20px;

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
}
</style>
