<template>
  <el-cascader
    expand-trigger="hover"
    @active-item-change="handleItemChange"
    @change="handleChange"
    :options="produceList"
    :children="children"
    :value="value"
    v-model="value">
  </el-cascader>
</template>

<script>
export default {
  name: 'PicTypeSelect',

  props: {
    value: {
      type: Array,
      default: []
    }
  },

  data () {
    return {
      selected: [],
      children: 'children'
    }
  },

  computed: {
    produceList () {
      return this.$store.state.picType.list
    }
  },

  watch: {
    selected (value) {
      this.$emit('input', value)
    }
  },

  methods: {

    handleItemChange (item) {
      console.log(item)
      this.$emit('active-item-change', item)
    },

    handleChange (value) {
      console.log(value)
      this.$emit('change', value)
    }
  },

  created () {
    if (!this.$store.state.picType.isLoad) {
      this.$store.dispatch('getType')
    }
  }
}
</script>
