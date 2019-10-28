<template>
  <header class="header">
    <span class="icon-back" @click="$router.back()"></span>
    <h3><slot>title</slot></h3>
    <div class="rule" v-if="showRule" @click="$router.push({path: '/', query: {view: true}})">
      <span class="icon-question"></span>
      游戏规则
    </div>
  </header>
</template>

<script>
export default {
  name: 'g-header',
  props: {
    showRule: Boolean,
  }
}
</script>

<style scoped lang='scss'>
.header {
  @include flex(space-between, center);
  position: relative;
  width: 100%;
  height: 88px;
  padding: 0 40px;
  color: #fff;
  h3 {
    @include flex();
    position: absolute;
    left: 0;
    @include size(100%);
    text-align: center;
    font-size: 36px;
    pointer-events: none;
  }
  .rule {
    @include flex();
    font-size: 24px;
  }
}
.icon {
  &-back {
    @include size(54px);
    background: url("../assets/img/icon_back.png") no-repeat;
    background-size: cover;
  }
  &-question {
    @include size(24px);
    background: url("../assets/img/icon_rule.png") no-repeat;
    background-size: cover;
  }
}
</style>
