<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="index===currentIndex?'current':''"
            @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p v-if="food.description" class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old"
                                                                v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @addCart="parabola"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food" :shopcart="this.$refs.shopcart"></food>
  </div>
</template>

<script>
  import { xhr } from 'common/js/utils'
  import BSscroll from 'better-scroll'
  import Shopcart from 'components/shopcart/shopcart'
  import Cartcontrol from 'components/cartcontrol/cartcontrol'
  import Food from 'components/food/food'
  export default{
    components: {
      Shopcart,
      Cartcontrol,
      Food
    },
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let h1 = this.listHeight[i]
          let h2 = this.listHeight[i + 1]
//          遍历到最后一个时出现h2=undefined，需要判断为true
          if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      xhr.get('http://easy-mock.com/mock/59282da391470c0ac1fe53c7/elm/goods')
        .then((data) => {
          this.goods = data.goods
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        })
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BSscroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodScroll = new BSscroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3
        })
//        获取滚动时的Y坐标
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu (index, event) {
//        使用better-scroll时设置click=true时会触发两次click事件。
//        event._constructed=true时，此时click为自定义事件
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        this.foodScroll.scrollToElement(foodList[index], 300)
      },
      parabola (target) {
        // 体验优化，异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart._paralola(target)
        })
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display flex
    position absolute
    top 174px
    width 100%
    bottom 46px
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        padding 0 12px
        line-height 14px
        border-1px(rgba(7, 17, 27, 0.1))
        &.current
          position relative
          top -1px
          z-index 10
          height 56px
          background #fff
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          width 12px
          height 12px
          margin-right -2px
          background-size 12px 12px
          background-repeat no-repeat
          vertical-align top
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
    .foods-wrapper
      flex 1
      background #fff
      .title
        padding-left 14px
        height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        line-height 26px
        font-weight bold
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          padding-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size: 10px
            color rgb(7, 17, 27)
          .desc
            display inline-block
            margin-bottom 8px
            line-height 12px
            font-size 10px
          .extra
            height 10px
            .count
              margin-right 10px
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
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
</style>
