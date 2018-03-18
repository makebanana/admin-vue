<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>相片分类占比</span>
        </div>
        <ve-pie :data="typeData"></ve-pie>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>分类拍摄占比</span>
        </div>
        <ve-pie :data="countData"></ve-pie>
      </el-card>
    </el-col>

    <el-col :span="24" style="margin-top: 20px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户拍摄次数前20</span>
        </div>
        <ve-histogram :data="photoData" :settings="photoSettings"></ve-histogram>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import VePie from 'v-charts/lib/pie'
import VeHistogram from 'v-charts/lib/histogram'

export default {
  name: 'AnalysisCustomer',

  components: {
    VePie,
    VeHistogram
  },

  data () {
    return {
      typeData: {},
      countData: {},
      photoData: {},
      photoSettings: {
        labelMap: {
          label: '相片',
          value: '拍摄数'
        }
      }
    }
  },

  methods: {
    _getAnalysis () {
      this.$fetch({
        url: '/server/analysis/photo'
      }).then(({ data: { type, count, photo } }) => {
        const typeConfig = {
          columns: ['label', 'value'],
          rows: type
        }
        const countConfig = {
          columns: ['label', 'value'],
          rows: count
        }
        const photoConfig = {
          columns: ['label', 'value'],
          rows: photo
        }
        this.typeData = typeConfig
        this.countData = countConfig
        this.photoData = photoConfig
      })
    }
  },

  created () {
    this._getAnalysis()
  }
}
</script>

<style lang="scss" scoped>
</style>
