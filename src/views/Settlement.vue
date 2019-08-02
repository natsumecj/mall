<template>
  <div>
    <van-row type="flex">
      <div class="go" @click="go">
        <van-icon name="arrow-left" color="#2086F0" size="20px" />
      </div>
      <div class="title">我的订单</div>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "Settlement",
    data(){
      return{

      }
    },
    methods:{
      go() {
        this.$router.go(-1);
      },
    }
  }
</script>

<style scoped lang="scss">
  .title {
    font-size: 30px;
    background-color: white;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    padding: 20px 0;
  }
  .go {
    background-color: white;
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
  }
</style>