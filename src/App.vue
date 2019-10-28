<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {
  },
  components: {
  }
}
</script>
<style lang="scss">
@import "assets/style/reset";
#app {
  height: 100vh;
  background: url("./assets/img/background.png") no-repeat;
  background-size: cover;
}
</style>
