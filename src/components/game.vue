<template>
  <div>
    <canvas ref='canvas'
      @mousedown="isMove = true"
      @mouseup="isMove = false"
      @mousemove="move"
      @touchstart="isMove = true"
      @touchend="isMove = false"
      @touchmove="move"
    ></canvas>
    <div class='btn-group'>
      <g-button @click.native='reset()' type='primary'>重试</g-button>
      <g-button size='large' @click.native="validate">想好了</g-button>
    </div>
  </div>
</template>
<script>
import GButton from './button'
export default {
  components: {
    GButton
  },
  data () {
    return {
      canvas: null,
      ctx: null,
      width: window.screen.width * 2,
      height: 590,
      size: 110,
      startX: 80,
      startY: 0,
      data: [],
      rect: [],
      lastItem: null,
      path: [],
    }
  },
  mounted () {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.reset()
  },
  methods: {
    reset (data) {
      this.data = data || [
        [1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1],
        [1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1],
        [0, 1, 1, 0, 1],
      ]
      this.rect = []
      this.lastItem = null
      this.path = []
      this.drawBackground()
      this.$emit('retry')
    },
    move (e) {
      if (!this.isMove) return
      e.preventDefault()
      const {canvas} = this
      let x = (e.touches[0].clientX - canvas.getBoundingClientRect().x) * 2
      let y = (e.touches[0].clientY - canvas.getBoundingClientRect().y) * 2
      this.pointInsideRect(x, y)
      // console.log(this.path.map(item => item.text))
      // this.validate()
    },
    validate () {
      if (this.path.length === this.data.flat(2).filter(i => i).length) {
        this.isMove = false
        console.log('完成')
        this.$emit('success', this.path)
      } else {
        this.$emit('error', this.path)
      }
    },
    drawBackground () {
      let {data, ctx, size, rect, canvas, startX, startY} = this
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      data.forEach((item, index) => {
        item.forEach((i, j) => {
          if (i === 0) return
          ctx.beginPath()
          ctx.fillStyle = i === 1 ? '#E8E5EB' : '#FF76AC'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          const pos = {x: j * (size + 10) + startX, y: index * (size + 10) + startY, w: size, h: size}
          this.roundedRect(pos.x, pos.y, pos.w, pos.h, 20)
          ctx.fill()
          // ctx.fillStyle = '#000'
          // ctx.fillText(j + index * 4, pos.x + (pos.w / 2), pos.y + (pos.h / 2))
          rect.push({...pos, text: j + index * 4, i: index, j})
        })
      })
      this.drawLine()
    },
    drawLine () {
      const {path, ctx} = this
      if (path.length < 1) return
      let last = path.slice(-1)[0]
      ctx.beginPath()
      // path.forEach((item, index) => {
      //   if (index === 0) {
      //     ctx.moveTo(item.x + item.w / 2, item.y + item.h / 2)
      //   } else {
      //     ctx.lineTo(item.x + item.w / 2, item.y + item.h / 2)
      //   }
      // })
      // ctx.stroke()
      const laugh = new Image()
      laugh.src = require('../assets/img/laugh.png')
      laugh.onload = function (e) {
        ctx.drawImage(laugh, last.x, last.y, last.w, last.h)
      }
    },
    pointInsideRect (x, y) {
      let {rect, lastItem} = this
      let result = null
      for (let item of rect) {
        if (x >= item.x && x <= item.x + item.w && y >= item.y && y <= item.y + item.h) {
          result = item
          break
        }
      }
      if (!result) return
      if (this.data[result.i][result.j] !== 1) return
      if (!lastItem) {
        this.data[result.i][result.j] = 2
        this.lastItem = {...result}
        this.path.push(this.lastItem)
        this.drawBackground()
        return
      }
      if (
        (result.i === lastItem.i && (result.j === lastItem.j + 1 || result.j === lastItem.j - 1)) ||
        (result.j === lastItem.j && (result.i === lastItem.i + 1 || result.i === lastItem.i - 1))
      ) {
        this.data[result.i][result.j] = 2
        this.lastItem = {...result}
        this.path.push(this.lastItem)
        this.drawBackground()
      }
    },
    roundedRect (x, y = 0, width, height, radius) {
      let {ctx} = this
      ctx.save()
      ctx.beginPath()
      ctx.lineWidth = 2 * this.ratio
      ctx.moveTo(x, y + radius)
      ctx.lineTo(x, y + height - radius)
      ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
      ctx.lineTo(x + width - radius, y + height)
      ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
      ctx.lineTo(x + width, y + radius)
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
      ctx.lineTo(x + radius, y)
      ctx.quadraticCurveTo(x, y, x, y + radius)

      for (var i = 1; i < Math.floor(height / 20); i++) {
        ctx.moveTo(x, y + (i * 20))
        ctx.lineTo(x + width, y + (i * 20))
      }
    }
  },
}
</script>
<style lang="scss" scoped>
canvas {
  max-width: 100vw;
}
.btn-group {
  display: flex;
  justify-content: space-between;
  width: 590px;
  margin: 80px auto 0;
}
</style>
