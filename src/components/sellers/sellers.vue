<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <div class="remark">
          <div class="price">
            <h1 class="title">起送价</h1>
            <div class="content">
              <span class="text">{{seller.minPrice}}</span>
              <span class="unit">元</span>
            </div>
          </div>
          <div class="delivery">
            <h1 class="title">商家配送</h1>
            <div class="content">
              <span class="text">{{seller.deliveryPrice}}</span>
              <span class="unit">元</span>
            </div>
          </div>
          <div class="time">
            <h1 class="title">平均配送时间</h1>
            <div class="content">
              <span class="text">{{seller.deliveryTime}}</span>
              <span class="unit">分钟</span>
            </div>
          </div>
        </div>
        <div class="favorite" @click="toggleFavorite($event)">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="text">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="item in seller.supports">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from 'components/star/star'
  import split from 'components/split/split'
  import BSscroll from 'Better-Scroll'
  import { saveToLocal, loadFromLocal } from 'common/js/store'
  export default{
    components: {star, split},
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite')
        })()
      }
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this._initScroll()
      this._picScroll()
    },
    watch: {
      'seller' () {
        this._initScroll()
        this._picScroll()
      }
    },
    methods: {
      _initScroll () {
        this.$nextTick(() => {
          // 商家页滚动
          if (!this.scroll) {
            this.scroll = new BSscroll(this.$refs.seller, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      _picScroll () {
        // 商家实景图X轴滚动
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$nextTick(() => {
            this.$refs.picList.style.width = width + 'px'
            if (!this.picScroll) {
              this.picScroll = new BSscroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.picScroll.refresh()
            }
          })
        }
      },
      toggleFavorite (event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        // 前端缓存商家id=xxx的数据
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .seller
    position absolute
    top 174px
    bottom 0
    left 0
    overflow hidden
    width 100%
    background #fff
    .overview
      position relative
      padding 18px
      .title
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .desc
        font-size 0
        margin-top 8px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .star
          display inline-block
          margin-right 8px
        .text
          display inline-block
          line-height 18px
          margin-right 12px
          vertical-align top
          font-size 10px
          color rgb(77, 85, 93)

      .remark
        display flex
        margin 18px 0 0 0
        .price, .delivery, .time
          flex 1
          text-align center
          border-right 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-right none
          .title
            margin-bottom 4px
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .content
            line-height 24px
            font-size 0
            color rgb(7, 17, 27)
            .text
              font-size 24px
            .unit
              font-size 10px

      .favorite
        position absolute
        top 18px
        right 11px
        width 50px
        text-align center
        .icon-favorite
          display block
          margin-bottom 4px
          line-height 24px
          color #d4d6d9
          &.active
            color red
        .text
          line-height 10px
          font-size 10px
          color rgb(77, 85, 93)
    .bulletin
      padding 18px 18px 0 18px
      .title
        margin-bottom 8px
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .content-wrapper
        padding 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .text
          line-height 28px
          font-size 12px
          color rgb(240, 20, 20)
          font-weight 200
      .supports
        .support-item
          padding 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display inline-block
            width 16px
            height 16px
            vertical-align top
            margin-right 6px
            background-size 16px 16px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .text
            line-height 16px
            font-size 12px
            font-weight 200
            color rgb(7, 17, 27)
    .pics
      padding 18px
      .title
        margin-bottom 12px
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin-right 0
    .info
      padding 18px 18px 0 18px
      color rgb(7, 17, 27)
      .title
        padding-bottom 12px
        line-height 14px
        font-size 14px
        border-1px(rgba(7, 17, 27, 0.1))
      .info-item
        padding 16px 12px
        line-height 16px
        font-size 12px
        font-weight 200
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-1px(#fff)
</style>
