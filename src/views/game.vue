<template>
  <div class="container">
    <g-header show-rule>一笔画完</g-header>
    <div class="title">
      <span>积分: 1234</span>
      <img :src="title" alt="level">
      <span>倒计时: {{second}}s</span>
    </div>
    <div class="tip">提示：每天每个ID首次闯关免费，再次闯关需要100积分</div>
    <game
      class="game" ref="game"
      @retry="retry" @success="success"
      @error="defeat" :level="level"
    />

    <g-modal v-model="showModal" class="modal">
      <div class="reward-content">
        <span class="score">积分: 1111</span>
        <div class="status" :class="['defeat', 'succeed'][status]"></div>
        <div class="level-title">第{{level}}关 {{['挑战失败', '挑战成功'][status]}}</div>
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
      </div>
      <div class="btn-group" slot="footer">
        <g-button v-if="false" disabled>今日已领取</g-button>
        <g-button v-else>领取奖励</g-button>
        <g-button type="primary" size="large" @click.native="reset">继续闯关</g-button>
      </div>
    </g-modal>
    <!--<g-modal v-model="showModal" :status="status" class="modal">
      <div class="get-reward">
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
      second: 30,
      timer: null,
    }
  },
  computed: {
    title () {
      return require(`../assets/img/level_${this.level}.png`)
    }
  },
  watch: {
    showModal: function (val) {
      console.log(val)
      if (val) {
        clearTimeout(this.timer)
        this.timer = null
      } else {
        this.countdown()
      }
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
    next () {
      this.level++
      this.$refs.game.reset()
    },
    defeat () {
      this.status = 0
      this.showModal = true
    },
    retry () {
      clearTimeout(this.timer)
      this.second = 30
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
      this.timer && clearTimeout(this.timer)
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

      .reward-content {
        > p {
          font-size: 24px;
          text-align: center;
          font-weight: bold;
          margin-top: 79px;
        }
      }
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
      .level-title {
        font-size: 40px;
        font-style: italic;
        font-weight: 600;
        text-align: center;
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
      .btn-group {
        width: 100%;
        @include flex(space-between, center);
      }

      .btn {
        width: 100%;
        @include flex();
      }
      .get-reward {
        height: 390px;
        @include flex();
        flex-direction: column;
        text-align: center;
        font-weight: bold;
        img {
          @include size(120px);
        }
        p {
          font-size: 40px;
          color: #FF0065;
        }
        span {
          margin: 30px 0;
        }
      }
    }
  }
</style>
