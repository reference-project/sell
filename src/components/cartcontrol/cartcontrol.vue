<template>
  <div class="cartcontrol">
    <div class="cart-decrease" @click="decreaseCount($event)">
      <transition name="move">
        <span v-show="food.count>0" class="icon-remove_circle_outline"></span>
      </transition>
    </div>
    <div v-show="food.count>0" class="cart-count">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click="addCart($event)"></div>
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
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      .move-enter-active,.move-leave-active
        transition: all .5s linear
      .move-enter,.move-leave-active
        opacity 0
      .icon-remove_circle_outline
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
