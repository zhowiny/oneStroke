<template>
  <div class="modal" @touchmove.prevent :class="{show: visible}">
    <div class="mask" @click="visible = false"></div>
    <div class="content-box">
      <div class="content">
        <slot>
          xxxx
        </slot>
      </div>
      <div class="footer">
        <slot name="footer">
          xxxx
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      visible: this.value
    }
  },
  watch: {
    value: function (val) {
      this.visible = val
    },
    visible: function (val) {
      this.$emit('input', val)
    }
  },
  components: {
  },
}
</script>

<style scoped lang='scss'>
.modal {
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
  transition: all .3s;
  &.show {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    @include size(100vw, 100vh);
    background: rgba(0, 0, 0, .7);
    z-index: 1;
  }
  .content-box {
    @include flex();
    flex-direction: column;
    @include center();
    position: fixed;
    z-index: 2;
    width: 590px;
  }
  .content {
    position: relative;
    width: 590px;
    max-height: 657px;
    background: #fff;
    border-radius: 20px;
    padding: 40px 100px;
  }
  .footer {
    width: 100%;
    margin-top: 60px;
  }
}
</style>
