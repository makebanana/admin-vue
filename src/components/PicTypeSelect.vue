     <template>
  <el-cascader
    @active-item-change="handleItemChange"
    @change="handleChange"
    :options="produceList"
    :props="props"
    :filterable="filterable"
    :value="value"
    :change-on-select="changeOnSelect"
    v-model="selected"
    placeholder="请选择相片分类"
    clearable>
  </el-cascader>

</template>

<script>
import deepClone from '@/util/deepClone'
export default {
  name: 'PicTypeSelect',

  props: {
    filterable: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: []
    },
    selectPic: {
      type: Boolean,
      default: false
    },
    changeOnSelect: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      props: {
        value: '_id'
      },
      selected: [],
      picObj: {
        id: null,
        list: []
      }
    }
  },

  computed: {
    produceList () {
      let list = deepClone(this.$store.state.picType.list)
      if (this.selectPic && list.length) {
        list.forEach(a => {
          a.children.forEach(b => {
            this.$set(b, 'children', b.id === this.picObj.id ? this.picObj.list : [])
          })
        })
      }
      return list
    }
  },

  watch: {
    selected (value) {
      this.$emit('input', value)
    },

    value (value) {
      this.selected = value
    }
  },

  methods: {
    _getPicList (typeId) {
      this.$fetch({
        url: 'server/user'
      }).then(res => {
        res.data.userList.forEach(item => {
          item.label = item.name
        })

        this.upDateSelect({
          id: typeId,
          list: res.data.userList
        })
      })
    },

    upDateSelect (obj) {
      this.picObj = obj
    },

    handleItemChange (item) {
      this.$emit('active-item-change', item)

      if (item.length === 2) {
        this._getPicList(item[1])
      }
    },

    handleChange (value) {
      let returnItem = {}
      if (this.picObj.id) {
        let selectedId = value[2]

        this.picObj.list.some(pic => {
          if (pic.id === selectedId) {
            returnItem = pic
            return true
          }
        })
      }
      this.$emit('change', value, returnItem)
    }
  },

  created () {
    if (!this.$store.state.picType.isLoad) {
      this.$store.dispatch('getType')
    }
  }
}
</script>
