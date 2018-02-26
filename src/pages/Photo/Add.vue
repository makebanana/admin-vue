<template>
  <div>
    <el-form :model="pic" :rules="rules" ref="pic" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input  v-model="pic.name" placeholder="请输入用户名称"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="type">
        <PicTypeSelect v-model="pic.type" />
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input type="textarea" v-model="pic.intro" placeholder="相片简介"></el-input>
      </el-form-item>
      <el-form-item label="相片" prop="pictures">
        <el-upload
          action="/server/upload"
          list-type="picture-card"
          name="files"
          multiple
          accept="/image/*"
          :on-success="handleUploaded"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemovePic">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('pic')">立即创建</el-button>
        <el-button @click="resetForm('pic')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<script>
import PicTypeSelect from '@/components/PicTypeSelect'

export default {
  name: 'PhotoAdd',

  components: {
    PicTypeSelect
  },

  data () {
    let validateArray = (rule, value, callback) => {
      if (value.length) {}
      return value.length ? callback() : callback(new Error(rule.message))
    }

    return {
      pic: {
        name: '',
        type: [],
        intro: '',
        pictures: []
      },
      dialogVisible: false,
      dialogImageUrl: '',
      rules: {
        name: [{ required: true, message: '请输入相片名称', trigger: 'blur' }],
        // pictures: [{ validator: validateArray, message: '请添加照片', trigger: 'blur' }],
        type: [{ validator: validateArray, message: '请选择相片分类', trigger: 'blur' }]
      }
    }
  },

  methods: {
    handleUploaded (response, file, fileList) {
      console.log(response, file, fileList)
    },

    handleRemovePic (file, fileList) {
      console.log(file, fileList)
    },

    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) { return false }

        this.$fetch({
          url: '/server/photo',
          type: 'POST',
          data: this.pic
        }).then(res => {
          this.$tab.close()
          this.$tab.open('/photo/list')
          this.$tab.reload('/photo/list')
        })
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
.el-input__inner{
  width: 190px;
}
</style>
