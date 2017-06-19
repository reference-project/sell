<template>
  <div class="cartcontrol">
    <div class="cart-decrease" @click.stop.prevent="decreaseCount($event)">
        <transition name="bounce">
          <span v-show="food.count>0" class="icon-remove_circle_outline"></span>
        </transition>
    </div>
    <div v-show="food.count>0" class="cart-count">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('addCart', event.target)
      },
      decreaseCount (event) {
        if (!event._constructed) {
          return
        }
        this.food.count--
      }
    }
  }
</script>

<style lang="stylus">
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-out .5s linear;
  }
  @keyframes bounce-in {
    0% {
      opacity 0
      transform: translate3d(50px,0,0) rotate(360deg) scale(0.5);
    }
    100% {
      opacity 1
      transform: translate3d(0,0,0) rotate(0deg) scale(1);
    }
  }
  @keyframes bounce-out {
    0% {
      opacity 1
      transform: translate3d(0,0,0) rotate(0deg) scale(1);
    }
    100% {
      opacity 0
      transform: translate3d(50px,0,0) rotate(360deg) scale(0.5);
    }
  }
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      .icon-remove_circle_outline
        display block
        font-size 24px
        line-height 24px
        color rgb(0, 160, 220)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    .cart-increase
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
</style>
