<template>
  <transition name="food">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
        <div class="cartcontroll-wrapper">
          <cartcontrol :food="food" @addCart="parabola"></cartcontrol>
        </div>
        <transition name="fade">
          <div @click="addFirst($event)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
  import BSscroll from 'Better-Scroll'
  import Cartcontrol from 'components/cartcontrol/cartcontrol'
  import Vue from 'vue'
  export default {
    components: {
      Cartcontrol
    },
    props: {
      food: {
        type: Object
      },
      shopcart: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BSscroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      parabola (target) {
        // 体验优化，异步执行下落动画
        this.$nextTick(() => {
          this.shopcart._paralola(target)
        })
      },
      addFirst (event) {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
      }
    }
  }
</script>

<style lang="stylus">
  .food-enter-active
    animation food-in .5s
  .food-leave-active
    animation food-out .5s linear
  @keyframes food-in
    0%
      transform translate3d(100%, 0, 0)
    100%
      transform translate3d(0, 0, 0)
  @keyframes food-out
    0%
      transform translate3d(0, 0, 0)
    100%
      transform translate3d(-100%, 0, 0)

  .fade-enter-active
    animation fade-in .5s
  .fade-leave-active
    animation fade-out .5s linear
  @keyframes fade-in
    0%
      opacity 0
    100%
      opacity 1
  @keyframes fade-out
    0%
      opacity 1
    100%
      opacity 0
  .food
    position fixed
    top 0
    left 0
    bottom 48px
    z-index 30
    width 100%
    background #fff
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100% /*撑开正方形*/
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        left 0
        top 5px
        .icon-arrow_lift
          display block
          padding 10px
          color #fff
          font-size 20px
    .content
      position relative
      padding 18px
      .title
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
        line-height 14px
      .detail
        margin-bottom 18px
        height 10px
        line-height 10px
        font-size 0
        .sell-count, .rating
          font-size 10px
          color rgb(147, 153, 159)
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        line-height 24px
        .now
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147, 153, 159)
    .cartcontroll-wrapper
      position absolute
      bottom 12px
      right 12px
    .buy
      position absolute
      bottom 18px
      right 18px
      z-index 10
      height 24px
      line-height 24px
      padding 0 12px
      box-sizing border-box
      font-size 10px
      border-radius 12px
      color #fff
      background rgb(0, 160, 220)

</style>
