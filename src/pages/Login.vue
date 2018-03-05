<template>
  <div class="login-box">
    <el-form ref="loginForm" :model="form" label-width="80px">
      <el-form-item
        label="账号"
        prop="name"
       :rules="[
         { required: true, message: '账号不能为空'},
       ]">
        <el-input v-model="form.name" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[
          { required: true, message: '密码不能为空'},
        ]">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="login-button"
          :loading="isloading"
          :display='isloading'
          @click="onSubmit('loginForm')">{{isloading ? '正在登录...' : '登录'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'js-md5'

// 模块说明
// 用户的token, uid, uname sessionStorage
// 用户能够管理的权限获取， sessionStorage
export default {
  name: 'login',

  data () {
    return {
      isloading: false,
      form: {}
    }
  },

  methods: {
    _login () {
      this.$fetch({
        url: '/server/login',
        type: 'post',
        data: {
          mobile: this.form.name,
          password: md5(this.form.password)
        }
      }).then(res => {
        this.isloading = false
        sessionStorage.setItem('V_accessToken', `Bearer ${res.data.authorization}`)
        sessionStorage.setItem('V_userId', res.data.userId)
        this.$notify.success({
          title: '登录成功',
          message: `管理员${res.data.name},欢迎回来`
        })

        this.$router.push({ path: '/' })
      }).catch(_ => {
        this.isloading = false
      })
    },

    onSubmit (loginForm) {
      this.isloading = true
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this._login()
        } else {
          this.isloading = false
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .login-box{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -90px 0 0 -200px;
    padding: 20px 50px 0 0;
    width: 400px;
    height: 250px;
    border: 1px solid #d9d9d9;

    .login-button{
      width: 200px;
    }
  }
</style>
