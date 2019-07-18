<template>
  <div id="app">
    <router-view/>
    <van-tabbar
            v-model="active"
            active-color="red"
            inactive-color="#000"
    >
      <van-tabbar-item icon="wap-home">商城</van-tabbar-item>
      <van-tabbar-item icon="wap-nav">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    components:{},
    data(){
      return{
        active:0,
      }
    }
  }
</script>
<style lang="scss">
#app{
  background-color: #F2F2F2;
  font-size: 13px;
}
</style>
