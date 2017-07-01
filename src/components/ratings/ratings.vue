<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li  v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BSscroll from 'Better-Scroll'
  import star from 'components/star/star'
  import split from 'components/split/split'
  import ratingSelect from 'components/ratingSelect/ratingSelect'
  import { formatDate } from 'common/js/date'
  import { xhr } from 'common/js/utils'
  //  const POSITIVE = 0
  //  const NEGATIVE = 1
  const ALL = 2
  export default{
    components: {star, split, ratingSelect},
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        selectType: ALL,
        onlyContent: true,
        ratings: [],
        scroll: {}
      }
    },
    created () {
      xhr.get('http://easy-mock.com/mock/59282da391470c0ac1fe53c7/elm/ratings')
        .then((data) => {
          this.ratings = data.ratings
          this.$nextTick(() => {
            this.scroll = new BSscroll(this.$refs.ratings, {
              click: true
            })
          })
        })
    },
    methods: {
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd HH:mm')
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    overflow hidden
    width 100%
    background #fff
    .ratings-content
      .overview
        display flex
        padding 18px 0
        .overview-left
          flex 0 0 137px
          width 137px
          border-right 1px solid rgba(7, 17, 27, 0.1)
          text-align center
          .score
            line-height 28px
            padding-top 6px
            color rgb(255, 153, 0)
            font-size 24px
          .title
            padding 6px 0 8px 0
            line-height 12px
            font-size 12px
            color rgb(7, 17, 27)
          .rank
            padding-bottom 6px
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          @media only screen and (max-width: 320px)
            flex 0 0 120px
            width 120px
        .overview-right
          flex 1
          padding 6px 0 6px 24px
          @media only screen and (max-width: 320px)
            padding-left 6px
          .score-wrapper
            line-height 18px
            margin-bottom 8px
            font-size 0
            .title
              font-size 12px
              color rgb(7, 17, 27)
            .star
              display inline-block
              margin-left 12px
              vertical-align top
              @media only screen and (max-width: 320px)
                margin-left 6px
            .score
              margin-left 12px
              font-size 12px
              color rgb(255, 153, 0)
              @media only screen and (max-width: 320px)
                margin-left 6px
          .delivery-wrapper
            line-height 18px
            font-size 0
            .title
              font-size 12px
              color rgb(7, 17, 27)
            .time
              margin-left 12px
              font-size 12px
              color rgb(147, 153, 159)
      .rating-wrapper
        padding 0 18px
        .rating-item
          padding 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          display flex
          .avatar
            flex 0 0 28px
            width 28px
            margin-right 12px
            img
              border-radius 50%
          .content
            flex 1
            position relative
            .name
              line-height 12px
              font-size 10px
              color rgb(7, 17, 27)
            .star-wrapper
              padding: 4px 0 6px 0
              font-size 0
              .star
                display inline-block
                vertical-align top
                margin-right 6px
              .delivery
                font-size 10px
                color rgb(147, 153, 159)
                font-weight 200

            .text
              margin-bottom 8px
              line-height 18px
              font-size 12px
              color rgb(7, 17, 27)
            .recommend
              line-height 16px
              font-size 0
              .icon-thumb_up, .item
                display inline-block
                margin 0 8px 4px 0
                font-size 9px
              .icon-thumb_up
                color rgb(0, 160, 220)
              .item
                padding 0 6px
                border 1px solid rgba(7, 17, 27, 0.1)
                border-radius 1px
                color rgb(147, 153, 159)
                background #fff
            .time
              position absolute
              top 0
              right 0
              line-height 12px
              font-size 10px
              color rgb(147, 159, 153)
</style>
