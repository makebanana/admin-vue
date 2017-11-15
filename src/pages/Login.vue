<template>
  <div class="login-box">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.name" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="login-button"
          :loading="isloading"
          :display='isloading'
          @click="onSubmit">{{isloading ? '正在登录...' : '登录'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      isloading: false,
      form: {}
    }
  },
  methods: {
    onSubmit () {
      this.isloading = true
      setTimeout(() => {
        sessionStorage.setItem('V_accessToken', 123123)
        this.isloading = false
        this.$router.push(this.$route.redirect || { name: 'index' })
      }, 1000)
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
    height: 180px;
    border: 1px solid #d9d9d9;

    .login-button{
      width: 100px;
    }
  }
</style>
