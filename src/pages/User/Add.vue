<template>
  <div>
    <el-form :model="user" :rules="rules" ref="user" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input  v-model="user.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input class="take-picker" v-model="user.mobile" placeholder="请输入联系方式"></el-input>
      </el-form-item>
      <el-form-item label="微信号" prop="wechat">
        <el-input class="take-picker" v-model="user.wechat" placeholder="请输入微信号"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="user.sex" size="small">
          <el-radio-button label="woman">女士</el-radio-button>
          <el-radio-button label="man">男士</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" prop="birth">
        <el-date-picker type="date" placeholder="选择生日" v-model="user.birth"></el-date-picker>
      </el-form-item>
      <el-form-item label="来源" prop="from">
        <el-radio-group v-model="user.from" size="small">
          <el-radio-button label="wx">微信</el-radio-button>
          <el-radio-button label="mt">美团</el-radio-button>
          <el-radio-button label="tg">推广</el-radio-button>
          <el-radio-button label="qt">其他</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item required label="拍摄记录" prop="playList">
        <div class="produce-box" v-for="(pic, index) in user.playList">
          <PicTypeSelect v-model="pic.id" selectPic/>
          <el-date-picker
            type="datetime"
            placeholder="拍摄时间"
            v-model="pic.createTime"
            format="yyyy-MM-dd HH:mm">
          </el-date-picker>
          <div class="control-box">
            <el-button @click="handleAddPic"><i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button v-if="index !== 0" @click="handleRemovePic(index)"><i class="el-icon-remove-outline"></i></el-button>
          </div>
        </div>

      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="user.remark" placeholder="备注帮助你更好的记住这个用户"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('user')">立即创建</el-button>
        <el-button @click="resetForm('user')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import PicTypeSelect from '@/components/PicTypeSelect'

export default {
  name: 'UserAdd',

  components: {
    PicTypeSelect
  },

  data () {
    let validateMobile = (rule, value, callback) => {
      if (value && !/^1[34578]\d{9}$/.test(value)) {
        callback(new Error('请正确的手机号'))
      } else {
        callback()
      }
    }

    let validateProduce = (rule, value, callback) => {
      let noEmpty = value.filter(item => item.id.length && item.createTime)
      if (noEmpty.length !== value.length) {
        callback(new Error('请选择完整的拍摄相片以及拍摄时间'))
      } else {
        callback()
      }
    }

    return {
      user: {
        name: '',
        mobile: '',
        wechat: '',
        sex: 'woman',
        birth: '',
        from: 'wx',
        playList: [
          {
            id: [],
            createTime: ''
          }
        ],
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ],
        produce: [
          { validator: validateProduce, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    handleAddPic () {
      this.user.playList.push({
        id: [],
        createTime: ''
      })
    },

    handleRemovePic (index) {
      if (this.user.playList.length === 1) {
        this.$message('至少填写一条记录')
        return
      }

      this.user.playList.splice(index, 1)
    },

    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) { return false }

        this.$fetch({
          url: '/server/customer',
          type: 'POST',
          data: {
            ...this.user,
            playList: this.user.playList.map(({ id: [ta, tb, pa], createTime }) => ({
              type: [ta, tb],
              photo: pa,
              createTime
            }))
          }
        }).then(res => {
          this.$tab.close()
          this.$tab.reload('/user/list')
          this.$tab.open('/user/list')
        })
      })
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.el-input__inner{
  width: 190px;
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
