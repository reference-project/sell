<template>
  <div id="app">
    <elm-header :seller="seller"></elm-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/sellers">商家</router-link>
      </div>
    </div>
    <!--路由出口-->
    <!--路由配置到的组件将渲染到这里-->
    <!--相当于content-->
    <keep-alive>
      <router-view :seller="seller" :ratings="ratings" :goods="goods" keep-alive></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import elmHeader from 'components/header/header.vue'
  import { xhr, urlParse } from 'common/js/utils'
  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        },
        goods: {},
        ratings: {}
      }
    },
    components: {
      elmHeader
    },
    created () {
//      xhr.get('http://easy-mock.com/mock/59282da391470c0ac1fe53c7/elm/sellers')
//        .then((data) => {
//          this.seller = data.seller
//        })
//      xhr.get('http://easy-mock.com/mock/59282da391470c0ac1fe53c7/elm/goods')
//        .then((data) => {
//          this.goods = data.goods
//        })
//      xhr.get('http://easy-mock.com/mock/59282da391470c0ac1fe53c7/elm/ratings')
//        .then((data) => {
//          this.seratingsller = data.ratings
//        })
      xhr.all(
        {method: 'get', url: 'http://easy-mock.com/mock/59282da391470c0ac1fe53c7/elm/sellers?id=' + this.seller.id},
        {method: 'get', url: 'http://easy-mock.com/mock/59282da391470c0ac1fe53c7/elm/goods'},
        {method: 'get', url: 'http://easy-mock.com/mock/59282da391470c0ac1fe53c7/elm/ratings'}
      ).then((datas) => {
        this.seller = Object.assign({}, datas[0].seller, {id: this.seller.id})
        this.goods = datas[1].goods
        this.ratings = datas[2].ratings
      })
    }
  }
</script>

<style lang="stylus">
  @import './common/stylus/mixin.styl'
  #app
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      border-1px (rgba(7, 17, 27, 0.1))
      background #fff
      .tab-item
        flex 1
        text-align center
        & > a
          display block
          font-size 14px
          color rgb(77, 85, 93)
          &.active
            color rgb(240, 20, 20)
</style>
