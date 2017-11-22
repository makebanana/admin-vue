<template>
  <div>
    <p>user detail : this.$attrs.query = {{$attrs.query}}</p>
    <h1>{{ user.name }}</h1>
    <h2>{{ user.mobile }}</h2>
  </div>

</template>

<script>
export default {
  name: 'userdetail',
  data () {
    return {
      uid: null,
      user: {}
    }
  },
  created () {
    let { uid } = this.$attrs.query
    this.uid = uid
    this.$fetch({
      url: '/api/user/' + uid
    }).then(res => {
      this.user = res.data.user
    })
  }
}
</script>

<style lang="scss">
</style>
