<template>
  <div>
    <van-row type="flex" justify="center">
      <div class="title">会员中心</div>
    </van-row>
    <div>
      <van-row>
        <div class="log">
          <van-row>
            <van-icon name="setting" color="white" size="20px" class="set" @click="data"/>
          </van-row>
          <div class="user">
            <van-icon name="user-circle-o" color="white" size="70px" />
          </div>
            <div v-if="user" class="welcome">
                欢迎您：{{user.nickname}}
            </div>
            <div v-if="user" class="quit" >
                <span @click="quits">退出登录</span>
            </div>
          <span @click="login" v-else>请登录或注册</span>
        </div>
      </van-row>
    </div>
    <van-row
      type="flex"
      justify="space-around"
      style="border-bottom: 1px solid #d5d5d5;background-color: white"
    >
      <van-col span="4" align="center">
        <van-icon
          name="pending-payment"
          color="grey"
          size="30px"
          class="icn"
        />
        <p class="wait">待付款</p>
      </van-col>
      <van-col span="4" align="center">
        <van-icon
          name="tosend"
          color="grey"
          size="30px"
          class="icn"
        />
        <p class="wait">待发货</p>
      </van-col>
      <van-col span="4" align="center">
        <van-icon
          name="logistics"
          color="grey"
          size="30px"
          class="icn"
        />
        <p class="wait">待收货</p>
      </van-col>
      <van-col span="4" align="center">
        <van-icon
          name="description"
          color="grey"
          size="30px"
          class="icn"
        />
        <p class="wait">评价</p>
      </van-col>
      <van-col span="4" align="center">
        <van-icon
          name="points"
          color="grey"
          size="30px"
          class="icn"
        />
        <p  class="wait">已完成</p>
      </van-col>
    </van-row>
      <br>
      <van-row>
          <div class="order">
              <van-cell title="全部订单" is-link icon="records"/>
          </div>
      </van-row>
      <van-row>
          <div class="collect" @click="collect">
              <van-cell title="收藏商品" is-link icon="points"/>
          </div>
      </van-row>
      <van-row>
          <div class="address" @click="address">
              <van-cell title="地址管理" is-link icon="gold-coin-o"/>
          </div>
      </van-row>
      <van-row>
          <div class="browse" @click="browse">
              <van-cell title="最近浏览" is-link icon="send-gift-o"/>
          </div>
      </van-row>
  </div>
</template>

<script>
    import axios from 'axios'
export default {
  name: "Person",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    login() {
        this.$router.push('/login')
    },
    quits(){
        axios.post('api/v1/loginOut',{})
            .then(res=>{
                console.log(res);
                this.$store.state.userInfo=null
                localStorage.clear('user')
            }).catch(err=>{
            console.log(err);
        })
    },
      collect(){
        this.$router.push('/collect')
      },
      browse(){
        this.$router.push("/browse")
      },
    data(){
      this.$router.push('/personal')
    },
      address(){
        this.$router.push('/address')
      }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {
      user(){
          return this.$store.state.userInfo
      }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.title {
  font-size: 30px;
  background-color: white;
  width: 100%;
  text-align: center;
}
.log {
  width: 100%;
  height: 400px;
  background-color: #1ec3ff;
}
.log>span {
    font-size:26px;
    color: white;
    margin-left:300px;
  }
.welcome{
    text-align: center;
    margin:20px;
    font-size: 36px;
    color: white;
}
.quit{
    text-align: center;
    font-size: 16px;
    color: white;
}
.set {
  margin: 10px;
  float: right;
}
.user {
  display: flex;
  justify-content: center;
}
    .wait{
        font-size: 14px;color: #000;padding-bottom: 10px;text-align: center;margin: 0;
    }
    .icn{
        margin-top: 10px
    }
    .order{
        padding: 10px 0;
        background-color: white;
    }
    .collect{
        padding: 10px 0;
        background-color: white;
    }
    .address{
        padding: 10px 0;
        background-color: white;
    }
    .browse{
        padding: 10px 0;
        background-color: white;
    }
</style>
