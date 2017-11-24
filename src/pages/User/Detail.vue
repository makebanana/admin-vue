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
      id: null,
      user: {}
    }
  },
  created () {
    let { id } = this.$attrs.query
    this.id = id
    this.$fetch({
      url: '/api/user/' + id
    }).then(res => {
      this.user = res.data.user
    })
  }
}
</script>

<style lang="scss">
</style>
