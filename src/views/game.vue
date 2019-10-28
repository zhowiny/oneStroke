<template>
  <div class="container">
    <g-header show-rule>一笔画完</g-header>
    <div class="title">
      <span>积分: 1234</span>
      <img :src="title" alt="level">
      <span>倒计时: {{second}}s</span>
    </div>
    <div class="tip">提示：每天每个ID首次闯关免费，再次闯关需要100积分</div>
    <game class="game" ref="game" @retry="retry" @success="success" @error="defeat"/>

    <g-modal v-model="showModal" :status="status" :level="level" @reset="reset"></g-modal>
    <!--<g-modal v-model="showModal" :status="status" class="modal">
      <div class="reward">
        <img src="../assets/img/reward_kh.png" alt="">
        <span>第5关奖励</span>
        <p>Diro口红一支</p>
      </div>
      <div slot="footer" class="btn">
        <g-button size="large">领取奖励</g-button>
      </div>
    </g-modal>-->
  </div>
</template>
<script>
import GHeader from '../components/header'
import Game from '../components/game'
import GModal from '../components/modal'
import GButton from '../components/button'
export default {
  data () {
    return {
      level: 1,
      showModal: false,
      status: 1,
      second: 5,
      timer: null,
    }
  },
  computed: {
    title () {
      return require(`../assets/img/level_${this.level}.png`)
    }
  },
  created () {
    this.countdown()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.countdown()
    })
  },
  beforeRouteLeave (to, from, next) {
    clearTimeout(this.timer)
    next()
  },
  methods: {
    success () {
      this.status = 1
      this.showModal = true
    },
    defeat () {
      this.status = 0
      this.showModal = true
    },
    retry () {
      clearTimeout(this.timer)
      this.second = 5
      this.countdown()
    },
    reset () {
      this.showModal = false
      this.$refs.game.reset()
      this.retry()
    },
    countdown () {
      if (this.second < 1) {
        clearTimeout(this.timer)
        this.timer = null
        this.defeat()
        return
      }
      this.timer = setTimeout(() => {
        this.second--
        this.countdown()
      }, 1000)
    },
  },
  components: {
    Game,
    GHeader,
    GModal,
    /* eslint-disable */
    GButton,
  }
}
</script>
<style lang="scss" scoped>
.container {
  .title {
    position: relative;
    height: 142px;
    text-align: center;
    margin-top: 52px;
    span {
      @include flex();
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      @include size(180px, 60px);
      font-size: 24px;
      font-weight: 600;
      text-align: center;
      color: #fff;
      background:rgba(0, 0, 0, .3);
      border-radius:30px 0 0 30px;
      &:first-child {
        border-radius:0 30px 30px 0;
        right: auto;
        left: 0;
      }
    }
    img {
      max-height: 100%;
    }
  }
  .tip {
    margin-top: 10px;
    font-size: 20px;
    color: #fff;
    text-align: center;
  }
  .game {
    margin-top: 60px;
  }
  .modal {
    .btn {
      width: 100%;
      @include flex();
    }
    .reward {
      height: 390px;
      @include flex();
      flex-direction: column;
      text-align: center;
      p {
        font-size: 40px;
      }
      span {
        margin: 30px 0;
      }
    }
  }
}
</style>
