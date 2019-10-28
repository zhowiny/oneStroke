<template>
  <div :class="['button', `button--${size}`, `button--${type}`, disabled ? 'disabled' : '']">
    <slot>button</slot>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      default: 'default',
      type: String,
    },
    type: {
      default: 'default',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data () {
    return {}
  },
  created () {
  },
  components: {
  }
}
</script>
<style lang="scss" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 88px;
  width: 190px;
  border-radius: 50px;
  background: #FF5692;
  color: #fff;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  font-size: 32px;
  font-family:PingFang SC;
  font-weight:bold;
  box-shadow: 0 10px 50px #ff5692;
  &--large {
    width: 360px;
  }
  &--primary {
    background: #FFEA04;
    color: #333;
    box-shadow: 0 10px 50px #FFEA04;
  }
  &.disabled {
    background: #D6D8DC;
    box-shadow: none;
  }
}
</style>
