<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <div v-show="!isEdit" class="user-info">
        <h3>{{user.name}}</h3>
        <p>手机号: <span>{{user.mobile}}</span></p>
        <p>微信号: <span>{{user.wechat}}</span></p>
        <p>性别: <span>{{user.sex}}</span></p>
        <p>生日: <span>{{user.birth}}</span></p>
        <p>来源: <span>{{user.from}}</span></p>
        <p>备注: <span>{{user.remark}}</span></p>
        <el-button class="edit-btn" @click="handleEdit">编辑</el-button>
      </div>
      <div v-show="isEdit">
        <el-form :model="tempUser" :rules="rules" ref="user" label-width="100px">
          <el-form-item label="名称" prop="name">
            <el-input  v-model="tempUser.name" placeholder="请输入用户名称"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input class="take-picker" type="number" v-model="tempUser.mobile" placeholder="请输入用户联系方式"></el-input>
          </el-form-item>
          <el-form-item label="微信号" prop="mobile">
            <el-input class="take-picker" v-model="tempUser.wechat" placeholder="请输入用户微信号"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="tempUser.sex" size="small">
              <el-radio-button label="woman">女士</el-radio-button>
              <el-radio-button label="man">男士</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日" prop="birth">
            <el-date-picker type="date" placeholder="选择生日" v-model="tempUser.birth"></el-date-picker>
          </el-form-item>
          <el-form-item label="来源" prop="from">
            <el-radio-group v-model="tempUser.from" size="small">
              <el-radio-button label="wx">微信</el-radio-button>
              <el-radio-button label="mt">美团</el-radio-button>
              <el-radio-button label="tg">推广</el-radio-button>
              <el-radio-button label="qt">其他</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="tempUser.remark" placeholder="备注帮助你更好的记住这个用户"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('user')">提交</el-button>
            <el-button @click="handleCancelEdit">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="13">
      <div class="user-pic">
        <p>拍摄记录</p>
        <div class="selected-box">
          <div class="pic-item">
            <img src="ddd" alt="">
            <p>xxxx</p>
          </div>
        </div>
        <div class="produce-box">
          <el-cascader
            expand-trigger="hover"
            :options="produceList"
            v-model="addPic.id">
          </el-cascader>
          <el-date-picker
            type="datetime"
            placeholder="拍摄时间"
            v-model="addPic.time"
            format="yyyy-MM-dd HH:mm">
          </el-date-picker>
          <div class="control-box">
            <el-button-group>
              <el-button type="primary" icon="el-icon-circle-plus-outline"></el-button>
              <el-button type="primary" icon="el-icon-remove-outline"></el-button>
            </el-button-group>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'userdetail',
  data () {
    let validateMobile = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error('请正确的手机号'))
      } else {
        callback()
      }
    }

    return {
      id: null,
      title: null,
      user: {},
      tempUser: {},
      addPic: {
        id: '',
        time: ''
      },
      isEdit: false,
      rules: {
        name: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入正确的手机号码', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      },
      produceList: [
        {
          value: 123,
          label: '相片1'
        },
        {
          value: 124,
          label: '相片2'
        },
        {
          value: 125,
          label: '相片3'
        }
      ]
    }
  },

  methods: {

    getUserData () {
      let { id } = this.$tab.params
      this.id = id
      this.$fetch({
        url: '/api/user/' + id
      }).then(res => {
        this.user = res.data.user
        this.tempUser = res.data.user
        this.$tab.setTitle(`用户详情: ${res.data.user.name}`)
      })
    },

    handleEdit () {
      this.isEdit = true
    },

    handleCancelEdit () {
      this.isEdit = false
    },

    // 提交表单
    submitForm (formName) {
      console.log(this.user)
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

  },

  created () {
    this.getUserData()
  }
}
</script>

<style lang="scss">
.input-wrap{
  margin: 20px 0;
  width: 400px;
}
.user-info{
  padding: 20px 40px;
  border: 1px solid #ddd;

  p{
    margin: 10px 0 20px;

    span{
      font-weight: bold;
    }
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
.user-pic{
  padding: 20px;
  min-height: 416px;
  border: 1px solid #ddd;
}
.produce-box{
  position: relative;
  margin-bottom: 10px;

  .take-picker{
    width: 190px;
  }

  .control-box{
    position: absolute;
    right: 0;
    top: 0;
    height: 40px;
    line-height: 40px;
    text-align: right;

    button{
      margin-left: 0;
      padding: 0;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border: none;

      i{
        font-size: 30px;
        color: #b3b3b3;
      }
    }
  }
}
</style>
