<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>客户年龄段占比</span>
        </div>
        <ve-pie :data="ageData"></ve-pie>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>客户来源占比</span>
        </div>
        <ve-pie :data="fromData"></ve-pie>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import VePie from 'v-charts/lib/pie'

export default {
  name: 'AnalysisCustomer',

  components: {
    VePie
  },

  data () {
    return {
      fromData: {},
      ageData: {}
    }
  },

  methods: {
    _getAnalysis () {
      const returnFrom = this.$options.filters['returnFrom']
      this.$fetch({
        url: '/server/analysis/customer'
      }).then(({ data: { age, from } }) => {
        const ageConfig = {
          columns: ['label', 'value'],
          rows: age
        }
        const fromConfig = {
          columns: ['label', 'value'],
          rows: from.map(({ label, value }) => ({
            label: returnFrom(label),
            value
          }))
        }
        this.ageData = ageConfig
        this.fromData = fromConfig
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
