<template>
  <div>
    <el-form :model="user" :rules="rules" ref="user" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="user.name"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="user.sex" size="small">
          <el-radio-button label="woman">女士</el-radio-button>
          <el-radio-button label="man">男士</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" prop="birth">
        <el-date-picker type="date" placeholder="选择生日" v-model="user.birth" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="来源" prop="from">
        <el-radio-group v-model="user.from" size="small">
          <el-radio-button label="wx">微信</el-radio-button>
          <el-radio-button label="mt">美团</el-radio-button>
          <el-radio-button label="tg">推广</el-radio-button>
          <el-radio-button label="qt">其他</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="拍摄记录" prop="produce">
        <div class="produce-box flex-box">
          {{selectedList.length ? selectedList.map(item => item.name).join(',') : '请选择拍摄的相片'}}

        </div>
        <div class="produce-select-box">
          <span
            v-for="(pic, i) in produceList"
            :class="pic.checked ? 'checked' : ''"
            @click.stop="handleChoosePic(i)">
            {{pic.name}}
          </span>
          <div>
            <button type="button" name="button">新增</button>
            <button type="button" name="button">关闭</button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="user.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('user')">立即创建</el-button>
        <el-button @click="resetForm('user')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'useradd',

  data () {
    return {
      user: {
        name: '',
        mobile: '',
        sex: 'woman',
        birth: '',
        from: 'wx',
        produce: '',
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        produce: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      },
      selectedList: [],
      produceList: [
        {
          id: 123,
          name: '相片1'
        },
        {
          id: 124,
          name: '相片2'
        },
        {
          id: 125,
          name: '相片3'
        }
      ]
    }
  },

  created () {
  },

  methods: {
    // 选择拍摄相片
    handleChoosePic (index) {
      let produceList = this.produceList
      produceList[index].checked = !produceList[index].checked

      this.produceList = produceList
      this.selectedList = this.produceList.filter(item => item.checked)
      this.user.produce = this.selectedList.map(item => item.id).join(',')
    },

    // 移除摸个相片
    handleRemovePic (index) {
      let selectedList = this.selectedList
      let id = selectedList[index].id

      selectedList.splice(index, 1)
      this.selectedList = selectedList

      this.produceList.some(item => {
        if (item.id === id) {
          item.checked = false
          return true
        }
      })

      this.user.produce = this.selectedList.map(item => item.id).join(',')
    },

    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.produce-box{
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  min-height: 40px;


}
.produce-select-box{
  position: absolute;
  bottom: 44px;
  left: 0;
  padding: 4px 4px 8px 8px;
  width: 100%;
  min-height: 60px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-shadow: 2px 0px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);

  span{
    margin: 4px 4px 0 0;
    padding: 4px 8px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    cursor: pointer;
    transition: all .3s;

    &.checked{
      color: #fff;
      background-color: #20a0ff;
    }

    &:hover{
      padding: 4px 12px;
    }
  }

  div{
    position: absolute;
    right: 80px;

  }
}
</style>
