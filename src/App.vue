<template>
  <div id="app">
    <elm-header></elm-header>
    <div class="tab">
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
    <router-view></router-view>
  </div>
</template>

<script>
  import elmHeader from './components/header/header.vue'

  export default {
    components: {
      elmHeader
    }
  }
</script>

<style lang="stylus">
  #app
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      .tab-item
        flex 1
        text-align center
        &>a
          display block
</style>
