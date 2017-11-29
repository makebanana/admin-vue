<template>
  <path-tabs
    v-model="activePath"
    tab-position="top"
    type="border-card"
    @tab-remove="handleDelTabs"
    @tab-click="handleTabClick">
    <path-tab-pane name="/">
      <span slot="label">首页</span>
      <Center/>
    </path-tab-pane>
    <path-tab-pane
      v-for="(item, index) in tabList"
      :key="item.path"
      :label="item.name"
      :name="item.path"
      :closable="item.closable">
        <div class="tab-control-box" v-loading="item.reloading">
          <a @click.stop="handleDelTabs(item.path)">关闭</a>
          <a @click.stop="handleReloadTab(index)">刷新</a>
          <a @click.stop="handleCloseOther(index)">关闭其他</a>
        </div>
        <div v-if="!item.reloading" :is="item.component" :tabQuery="item.query"> </div>
      </path-tab-pane>
  </path-tabs>
</template>

<script>
import PathTabs from './tabs'
import PathTabPane from './tab-pane'
export default {
  name: 'PathTabsView',

  components: {
    PathTabs,
    PathTabPane
  },

  computed: {
    activePath: {
      get () {
        return this.$store.state.app.activePath
      },
      set (val) {
        console.log(val)
      }
    }
  },

  data () {
    return {
      tabList: [
        {
          name: '活动列表',
          label: 'dadad',
          closable: false,
          component: r => require.ensure([], () => r(require('@/pages/User/List')), 'chunk_user_list')
        }
      ]
    }
  },

  methods: {

    // 切换tab
    handleTabClick (path) {
      console.log(path)
    },

    // 删除一个tabs
    handleDelTabs (path) {
      console.log(path)
    },

    // 刷新一个tabs
    handleReloadTab (index) {
      console.log(index)
    },

    // 关闭其他
    handleCloseOther (index) {
      console.log(index)
    }
  }
}
</script>

<style lang="css">
  .path-tabs--left,.path-tabs--right,.path-tabs__content,.path-tabs__nav-scroll,.path-tabs__nav-wrap{overflow:hidden}.path-tabs__header{padding:0;position:relative;margin:0 0 15px}.path-tabs__active-bar{position:absolute;bottom:0;left:0;height:2px;background-color:#409EFF;z-index:1;-webkit-transition:-webkit-transform .3s cubic-bezier(.645,.045,.355,1);transition:-webkit-transform .3s cubic-bezier(.645,.045,.355,1);transition:transform .3s cubic-bezier(.645,.045,.355,1);transition:transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);list-style:none}.path-tabs__new-tab{float:right;border:1px solid #d3dce6;height:18px;width:18px;line-height:18px;margin:12px 0 9px 10px;border-radius:3px;text-align:center;font-size:12px;color:#d3dce6;cursor:pointer;-webkit-transition:all .15s;transition:all .15s}.path-tabs__new-tab .path-icon-plus{-webkit-transform:scale(.8,.8);transform:scale(.8,.8)}.path-tabs__new-tab:hover{color:#409EFF}.path-tabs__nav-wrap{margin-bottom:-1px;position:relative}.path-tabs__nav-wrap::after{content:"";position:absolute;left:0;bottom:0;width:100%;height:2px;background-color:#dfe4ed;z-index:1}.path-tabs--border-card>.path-tabs__header .path-tabs__nav-wrap::after,.path-tabs--card>.path-tabs__header .path-tabs__nav-wrap::after{content:none}.path-tabs__nav-wrap.is-scrollable{padding:0 20px;-webkit-box-sizing:border-box;box-sizing:border-box}.path-tabs__nav-next,.path-tabs__nav-prev{position:absolute;cursor:pointer;line-height:44px;font-size:12px;color:#878d99}.path-tabs__nav-next{right:0}.path-tabs__nav-prev{left:0}.path-tabs__nav{white-space:nowrap;position:relative;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;float:left;z-index:2}.path-tabs__item{padding:0 20px;height:40px;-webkit-box-sizing:border-box;box-sizing:border-box;line-height:40px;display:inline-block;list-style:none;font-size:14px;font-weight:500;color:#2d2f33;position:relative}.path-tabs__item:focus,.path-tabs__item:focus:active{outline:0}.path-tabs__item .path-icon-close{border-radius:50%;text-align:center;-webkit-transition:all .3s cubic-bezier(.645,.045,.355,1);transition:all .3s cubic-bezier(.645,.045,.355,1);margin-left:5px}.path-tabs__item .path-icon-close:before{-webkit-transform:scale(.9);transform:scale(.9);display:inline-block}.path-tabs__item .path-icon-close:hover{background-color:#b4bccc;color:#fff}.path-tabs__item.is-active{color:#409EFF}.path-tabs__item:hover{color:#409EFF;cursor:pointer}.path-tabs__item.is-disabled{color:#b4bccc;cursor:default}.path-tabs__content{position:relative}.path-tabs--card>.path-tabs__header{border-bottom:1px solid #dfe4ed}.path-tabs--card>.path-tabs__header .path-tabs__nav{border:1px solid #dfe4ed;border-bottom:none;border-radius:4px 4px 0 0}.path-tabs--card>.path-tabs__header .path-tabs__active-bar{display:none}.path-tabs--card>.path-tabs__header .path-tabs__item .path-icon-close{position:relative;font-size:12px;width:0;height:14px;vertical-align:middle;line-height:15px;overflow:hidden;top:-1px;right:-2px;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.path-tabs--card>.path-tabs__header .path-tabs__item.is-active.is-closable .path-icon-close,.path-tabs--card>.path-tabs__header .path-tabs__item.is-closable:hover .path-icon-close{width:14px}.path-tabs--card>.path-tabs__header .path-tabs__item{border-bottom:1px solid transparent;border-left:1px solid #dfe4ed;-webkit-transition:color .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1);transition:color .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1)}.path-tabs--card>.path-tabs__header .path-tabs__item:first-child{border-left:none}.path-tabs--card>.path-tabs__header .path-tabs__item.is-closable:hover{padding-left:13px;padding-right:13px}.path-tabs--card>.path-tabs__header .path-tabs__item.is-active{border-bottom-color:#fff}.path-tabs--card>.path-tabs__header .path-tabs__item.is-active.is-closable{padding-left:20px;padding-right:20px}.path-tabs--border-card{background:#fff;border:1px solid #d8dce5;-webkit-box-shadow:0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);box-shadow:0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04)}.path-tabs--border-card>.path-tabs__content{padding:15px}.path-tabs--border-card>.path-tabs__header{background-color:#f5f7fa;border-bottom:1px solid #dfe4ed;margin:0}.path-tabs--border-card>.path-tabs__header .path-tabs__item{-webkit-transition:all .3s cubic-bezier(.645,.045,.355,1);transition:all .3s cubic-bezier(.645,.045,.355,1);border:1px solid transparent;margin:-1px -1px 0;color:#878d99}.path-tabs--border-card>.path-tabs__header .path-tabs__item.is-active{color:#409EFF;background-color:#fff;border-right-color:#d8dce5;border-left-color:#d8dce5}.path-tabs--border-card>.path-tabs__header .path-tabs__item:hover{color:#409EFF}.path-tabs--bottom .path-tabs__item:nth-child(2),.path-tabs--top .path-tabs__item:nth-child(2){padding-left:0}.path-tabs--bottom .path-tabs--left .path-tabs__item:nth-child(2),.path-tabs--bottom .path-tabs--right .path-tabs__item:nth-child(2),.path-tabs--bottom.path-tabs--border-card .path-tabs__item:nth-child(2),.path-tabs--bottom.path-tabs--card .path-tabs__item:nth-child(2),.path-tabs--top .path-tabs--left .path-tabs__item:nth-child(2),.path-tabs--top .path-tabs--right .path-tabs__item:nth-child(2),.path-tabs--top.path-tabs--border-card .path-tabs__item:nth-child(2),.path-tabs--top.path-tabs--card .path-tabs__item:nth-child(2){padding-left:20px}.path-tabs--bottom .path-tabs__header{margin-bottom:0;margin-top:10px}.path-tabs--bottom.path-tabs--border-card .path-tabs__header{border-bottom:0;border-top:1px solid #d8dce5}.path-tabs--bottom.path-tabs--border-card .path-tabs__nav-wrap{margin-top:-1px;margin-bottom:0}.path-tabs--bottom.path-tabs--border-card .path-tabs__item{border:1px solid transparent;margin:0 -1px -1px}.path-tabs--left .path-tabs__header,.path-tabs--left .path-tabs__nav-scroll,.path-tabs--left .path-tabs__nav-wrap,.path-tabs--right .path-tabs__header,.path-tabs--right .path-tabs__nav-scroll,.path-tabs--right .path-tabs__nav-wrap{height:100%}.path-tabs--left .path-tabs__active-bar,.path-tabs--right .path-tabs__active-bar{top:0;bottom:auto;width:2px;height:auto}.path-tabs--left .path-tabs__nav-wrap,.path-tabs--right .path-tabs__nav-wrap{margin-bottom:0}.path-tabs--left .path-tabs__nav-wrap.is-scrollable,.path-tabs--right .path-tabs__nav-wrap.is-scrollable{padding:30px 0}.path-tabs--left .path-tabs__nav-wrap::after,.path-tabs--right .path-tabs__nav-wrap::after{height:100%;width:2px;bottom:auto;top:0}.path-tabs--left .path-tabs__nav,.path-tabs--right .path-tabs__nav{float:none}.path-tabs--left .path-tabs__item,.path-tabs--right .path-tabs__item{display:block}.path-tabs--left.path-tabs--card .path-tabs__active-bar,.path-tabs--right.path-tabs--card .path-tabs__active-bar{display:none}.path-tabs--left .path-tabs__nav-next,.path-tabs--left .path-tabs__nav-prev,.path-tabs--right .path-tabs__nav-next,.path-tabs--right .path-tabs__nav-prev{height:30px;line-height:30px;width:100%;text-align:center;cursor:pointer}.path-tabs--left .path-tabs__nav-next i,.path-tabs--left .path-tabs__nav-prev i,.path-tabs--right .path-tabs__nav-next i,.path-tabs--right .path-tabs__nav-prev i{-webkit-transform:rotateZ(90deg);transform:rotateZ(90deg)}.path-tabs--left .path-tabs__nav-prev,.path-tabs--right .path-tabs__nav-prev{left:auto;top:0}.path-tabs--left .path-tabs__nav-next,.path-tabs--right .path-tabs__nav-next{right:auto;bottom:0}.path-tabs--left .path-tabs__active-bar,.path-tabs--left .path-tabs__nav-wrap::after{right:0;left:auto}.path-tabs--left .path-tabs__header{float:left;margin-bottom:0;margin-right:10px}.path-tabs--left .path-tabs__nav-wrap{margin-right:-1px}.path-tabs--left .path-tabs__item{text-align:right}.path-tabs--left.path-tabs--card .path-tabs__item{border-left:none;border-right:1px solid #dfe4ed;border-bottom:none;border-top:1px solid #dfe4ed}.path-tabs--left.path-tabs--card .path-tabs__item:first-child{border-right:1px solid #dfe4ed;border-top:none}.path-tabs--left.path-tabs--card .path-tabs__item.is-active{border:1px solid #dfe4ed;border-right-color:#fff;border-left:none;border-bottom:none}.path-tabs--left.path-tabs--card .path-tabs__item.is-active:first-child{border-top:none}.path-tabs--left.path-tabs--card .path-tabs__item.is-active:last-child{border-bottom:none}.path-tabs--left.path-tabs--card .path-tabs__nav{border-radius:4px 0 0 4px;border-bottom:1px solid #dfe4ed;border-right:none}.path-tabs--left.path-tabs--card .path-tabs__new-tab{float:none}.path-tabs--left.path-tabs--border-card .path-tabs__header{border-right:1px solid #dfe4ed}.path-tabs--left.path-tabs--border-card .path-tabs__item{border:1px solid transparent;margin:-1px 0 -1px -1px}.path-tabs--left.path-tabs--border-card .path-tabs__item.is-active{border-color:#d1dbe5 transparent}.path-tabs--right .path-tabs__header{float:right;margin-bottom:0;margin-left:10px}.path-tabs--right .path-tabs__nav-wrap{margin-left:-1px}.path-tabs--right .path-tabs__nav-wrap::after{left:0;right:auto}.path-tabs--right .path-tabs__active-bar{left:0}.path-tabs--right.path-tabs--card .path-tabs__item{border-bottom:none;border-top:1px solid #dfe4ed}.path-tabs--right.path-tabs--card .path-tabs__item:first-child{border-left:1px solid #dfe4ed;border-top:none}.path-tabs--right.path-tabs--card .path-tabs__item.is-active{border:1px solid #dfe4ed;border-left-color:#fff;border-right:none;border-bottom:none}.path-tabs--right.path-tabs--card .path-tabs__item.is-active:first-child{border-top:none}.path-tabs--right.path-tabs--card .path-tabs__item.is-active:last-child{border-bottom:none}.path-tabs--right.path-tabs--card .path-tabs__nav{border-radius:0 4px 4px 0;border-bottom:1px solid #dfe4ed;border-left:none}.path-tabs--right.path-tabs--border-card .path-tabs__header{border-left:1px solid #dfe4ed}.path-tabs--right.path-tabs--border-card .path-tabs__item{border:1px solid transparent;margin:-1px -1px -1px 0}.path-tabs--right.path-tabs--border-card .path-tabs__item.is-active{border-color:#d1dbe5 transparent}.slideInLeft-transition,.slideInRight-transition{display:inline-block}.slideInRight-enter{-webkit-animation:slideInRight-enter .3s;animation:slideInRight-enter .3s}.slideInRight-leave{position:absolute;left:0;right:0;-webkit-animation:slideInRight-leave .3s;animation:slideInRight-leave .3s}.slideInLeft-enter{-webkit-animation:slideInLeft-enter .3s;animation:slideInLeft-enter .3s}.slideInLeft-leave{position:absolute;left:0;right:0;-webkit-animation:slideInLeft-leave .3s;animation:slideInLeft-leave .3s}@-webkit-keyframes slideInRight-enter{0%{opacity:0;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(100%);transform:translateX(100%)}to{opacity:1;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes slideInRight-enter{0%{opacity:0;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(100%);transform:translateX(100%)}to{opacity:1;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(0);transform:translateX(0)}}@-webkit-keyframes slideInRight-leave{0%{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(0);transform:translateX(0);opacity:1}100%{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}}@keyframes slideInRight-leave{0%{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(0);transform:translateX(0);opacity:1}100%{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}}@-webkit-keyframes slideInLeft-enter{0%{opacity:0;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(-100%);transform:translateX(-100%)}to{opacity:1;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes slideInLeft-enter{0%{opacity:0;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(-100%);transform:translateX(-100%)}to{opacity:1;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(0);transform:translateX(0)}}@-webkit-keyframes slideInLeft-leave{0%{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(0);transform:translateX(0);opacity:1}100%{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:0}}@keyframes slideInLeft-leave{0%{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(0);transform:translateX(0);opacity:1}100%{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:0}}
</style>
