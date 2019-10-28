<template>
  <div class="modal" @touchmove.prevent :class="{show: visible}">
    <div class="mask" @click="visible = false"></div>
    <div class="content-box">
      <div class="content">
        <slot>
          <span class="score">积分: 1111</span>
          <div class="status" :class="['defeat', 'succeed'][status]"></div>
          <div class="title">第{{level}}关 {{['挑战失败', '挑战成功'][status]}}</div>
          <p>本期奖励一览</p>
          <div class="reward">
            <div>
              <img src="../assets/img/reward_score.png" alt="">
              <span>第3关</span>
              <p>200积分</p>
            </div>
            <div>
              <img src="../assets/img/reward_kh.png" alt="">
              <span>第5关</span>
              <p>Diro口红一支</p>
            </div>
          </div>
        </slot>
      </div>
      <div class="footer">
        <slot name="footer">
          <g-button v-if="false" disabled>今日已领取</g-button>
          <g-button v-else>领取奖励</g-button>
          <g-button type="primary" size="large" @click.native="$emit('reset')">继续闯关</g-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import GButton from './button'
export default {
  name: 'modal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      default: 1,
    },
    level: Number,
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
    GButton,
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
    .score {
      @include flex();
      position: absolute;
      left: 0;
      top: 0;
      @include size(180px, 60px);
      font-size: 24px;
      font-weight: 600;
      text-align: center;
      color: #fff;
      background:rgba(0, 0, 0, .3);
      border-radius:0 30px 30px 0;
    }
    .status {
      @include size(394px, 190px);
      &.succeed {
        background: url("../assets/img/succeed.png") no-repeat;
        background-size: cover;
      }
      &.defeat {
        background: url("../assets/img/defeat.png") no-repeat;
        background-size: cover;
      }
    }
    .title {
      font-size: 40px;
      font-style: italic;
      font-weight: 600;
      text-align: center;
    }
    > p {
      font-size: 24px;
      text-align: center;
      font-weight: bold;
      margin-top: 79px;
    }
    .reward {
      @include flex(space-between, center);
      font-weight: bold;
      font-size: 22px;
      > div {
        @include flex();
        flex-direction: column;
        text-align: center;
      }
      img {
        @include size(120px);
      }
      p {
        color: #FF0065;
      }
    }
  }
  .footer {
    width: 100%;
    margin-top: 60px;
    @include flex(space-between, center);
  }
}
</style>
