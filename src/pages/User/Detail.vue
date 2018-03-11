<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <div v-show="!isEdit" class="user-info">
        <h3>{{user.name}}</h3>
        <p><span>手机号:</span> {{user.mobile}}</p>
        <p><span>微信号:</span> {{user.wechat}}</p>
        <p><span>性别:</span> {{user.sex | returnSex}}</p>
        <p><span>生日:</span> {{user.birth | returnYMD}}</p>
        <p><span>来源:</span> {{user.from | returnFrom}}</p>
        <p><span>备注:</span> {{user.remark}}</p>
        <el-button class="edit-btn" @click="handleOpenAndCloseEdit">编辑</el-button>
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
            <el-button @click="handleOpenAndCloseEdit">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="13" v-show="!isEdit">
      <div class="user-pic">
        <h3>拍摄记录</h3>
        <div class="selected-box">
          <div class="pic-item" v-for="record in playList">
            <img :src="record.cover" :alt="record.name">
            <p>{{record.name}}</p>
            <p class="time">{{record.createTime | returnDate}}</p>
            <el-button type="danger">移除</el-button>
          </div>
        </div>
        <div class="produce-box">
          <el-form :model="tempUser" :rules="rules" ref="user" label-width="100px">
            <el-form-item label-width="0" prop="playList">
              <PicTypeSelect v-model="addPic.id" selectPic></PicTypeSelect>
              <el-date-picker
                type="datetime"
                placeholder="拍摄时间"
                v-model="addPic.time"
                format="yyyy-MM-dd HH:mm">
              </el-date-picker>
            </el-form-item>
            <el-form-item label-width="0">
              <el-button type="primary" @click="submitForm('user')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import PicTypeSelect from '@/components/PicTypeSelect'

export default {
  name: 'UserDetail',

  components: {
    PicTypeSelect
  },

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
      user: {},
      tempUser: {},
      playList: [],
      addPic: {
        id: [],
        time: ''
      },
      isEdit: false,
      rules: {
        name: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    _getUserData () {
      let { id } = this.$tab.params
      this.id = id
      this.$fetch({
        url: '/server/customer/' + id
      }).then(res => {
        this.user = res.data.customer
        this.tempUser = res.data.customer
        this.playList = res.data.customer.playList
        this.$tab.setTitle(`用户详情: ${res.data.customer.name}`)
      })
    },

    handleOpenAndCloseEdit () {
      this.isEdit = !this.isEdit
    },

    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },

  created () {
    this._getUserData()
  }
}
</script>

<style lang="scss">
.input-wrap{
  margin: 20px 0;
  width: 400px;
}
.user-info{
  padding: 20px;
  border: 1px solid #ddd;

  p{
    margin: 10px 0 20px;
    font-weight: bold;

    span{
      display: inline-block;
      margin-right: 20px;
      width: 60px;
      font-weight: normal;
      text-align: right;
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
  position: relative;
  padding: 20px 20px 160px;
  width: 500px;
  min-height: 430px;
  border: 1px solid #ddd;

  h3{
    margin-bottom: 10px;
  }

  .selected-box{
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    border-top: 1px solid #eee;

    .pic-item{
      position: relative;
      margin: 0 10px 10px 0;
      width: 150px;
      height: 190px;
      border: 1px solid #ddd;
      overflow: hidden;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      background-color: #fff;

      img{
        display: block;
        width: 148px;
        height: 148px;
      }

      p{
        padding: 0 4px;
        line-height: 20px;
        border-top: 1px solid #ddd;
      }

      .time{
        font-size: 12px;
      }

      button{
        position: absolute;
        bottom: 0;
        transform: translateY(40px);
        width: 100%;
        transition: all .3s;
        border-radius: 0;
      }

      &:hover{
        button{
          transform: translateY(0);
        }
      }
    }
  }

  .produce-box{
    position: absolute;
    bottom: 0;
    padding: 20px 0 0;
    width: 460px;
    border-top: 1px solid #ddd;

    .take-picker{
      width: 190px;
    }
  }
}

</style>
