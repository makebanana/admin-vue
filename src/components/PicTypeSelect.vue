<template>
  <el-cascader
    @active-item-change="handleItemChange"
    @change="handleChange"
    :options="produceList"
    :props="props"
    :value="value"
    v-model="selected"
    clearable>
  </el-cascader>
</template>

<script>
export default {
  name: 'PicTypeSelect',

  props: {
    value: {
      type: Array,
      default: []
    },
    selectPic: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      props: {
        value: 'id'
      },
      selected: [],
      picList: []
    }
  },

  computed: {
    produceList () {
      let list = this.$store.state.picType.list
      if (this.selectPic) {
        list.forEach(a => {
          a.children.forEach(b => {
            b.children = []
          })
        })
      }
      return list
    },

    listMap () {
      return this.$store.state.picType.listMap
    }
  },

  watch: {
    selected (value) {
      this.$emit('input', value)
    }
  },

  methods: {

    handleItemChange (item) {
      console.log(this.produceList)
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
