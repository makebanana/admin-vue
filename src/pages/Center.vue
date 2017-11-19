<template>
  <div class="index-wrap">
    <el-row :gutter="20">
      <el-col :span="6">
        新增用户数
        <el-badge class="mark" :value="12" />
      </el-col>
      <el-col :span="6">
        待处理
      </el-col>
      <el-col :span="6">
        问题反馈
      </el-col>
      <el-col :span="6">
        错误报告
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'center'
}
</script>

<style lang="scss">
</style>
