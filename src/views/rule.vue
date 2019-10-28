<template>
  <div>
    <g-header>一笔画完</g-header>
    <div class="title">
      <span>积分:1234</span>
      <img src="../assets/img/title.png" alt="level">
    </div>
    <div class="tip">提示：每天每个ID首次闯关免费，再次闯关需要100积分</div>
    <div class="rule">
      <h3>游戏规则</h3>
      <p>1.每个ID每天首次免费闯关，再次闯关需要花 费100积分；</p>
      <p>2.游戏一共5关，从第3关起闯关成功即可获得奖励 ，奖励每天只可领取一次；</p>
      <p>3.获得实物的用户必须正确填写收货信息，如若奖 励未及时领取，即视为放弃。</p>
    </div>
    <div class="btn" v-if="!$route.query.view">
      <g-button size="large" @click.native="$router.push({path: '/game'})">进入游戏</g-button>
    </div>
  </div>
</template>

<script>
import GHeader from '../components/header'
import GButton from '../components/button'

export default {
  name: 'rule',
  components: {
    GHeader,
    GButton,
  },
}
</script>

<style scoped lang='scss'>
.title {
  position: relative;
  height: 142px;
  text-align: center;
  margin-top: 52px;
  span {
    @include flex();
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    @include size(180px, 60px);
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    color: #fff;
    background:rgba(0, 0, 0, .3);
    border-radius:0 30px 30px 0;
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
.rule {
  margin: 100px auto 0;
  @include size(590px, 600px);
  background: rgba(38, 11, 70, .8);
  border-radius: 30px;
  font-size: 22px;
  /*font-weight: 600;*/
  color: #fff;
  padding: 40px;
  h3 {
    text-align: center;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 40px;
  }
  p + p {
    margin-top: 20px;
  }
}
.btn {
  @include flex();
  width: 100%;
  margin-top: 100px;
}
</style>
