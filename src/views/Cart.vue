<template>
  <div>
    <van-row type="flex" justify="center">
      <div class="title">购物车</div>
    </van-row>
    <van-row>
      <van-col span="8" class="check">
        <div class="box">
          <input
            type="checkbox"
            class="allcheckbox"
            v-model="checked"
            @change="check"
          /><span class="all" v-if="checked === false">全选</span
          ><span v-else class="all">取消全选</span>
        </div>
      </van-col>
      <van-col span="14">
        <div class="box2">
          <div class="total">合计：{{ allprice }}</div>
          <div class="total">
            请确认订单
          </div>
        </div>
      </van-col>
    </van-row>
    <div class="btn">
      <div class="allbtn">
        <div class="del" @click="del">
          删除
        </div>
        <div class="settle">
          去结算
        </div>
        <div style="clear: both"></div>
      </div>
    </div>

    <van-row v-if="user">
      <div class="goods" v-for="(item, index) in shopList" :key="item.cid">
        <van-col span="2" align="center">
          <input
            type="checkbox"
            class="checkbox"
            v-model="item.check"
            @change="single"
          />
        </van-col>
        <van-col span="7">
          <div class="img">
            <img :src="item.image_path" alt="" width="100%" />
          </div>
        </van-col>
        <van-col span="14">
          <div class="goodsname">
            <div class="itemname">
              {{ item.name }}
            </div>
            <div class="item">
              <div class="goodsprice">￥{{ item.present_price }}</div>
              <div class="step">
                <van-stepper
                  v-model="item.count"
                  min="1"
                  max="50"
                  integer
                  button-size="28px"
                  @change="add(item)"
                />
              </div>
            </div>
          </div>
        </van-col>
      </div>
<!--      <div v-else>-->
<!--        亲，购物车为空，快点去购买吧！-->
<!--      </div>-->
    </van-row>
    <div v-else class="login">
      <div>请先登录后，在添加购物车！</div>
      <van-button type="danger" @click="login" size="normal">
          点击登录
      </van-button>
      </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Cart",
  components: {},
  props: {},
  data() {
    return {
      checked: false,
      shopList: [],
      deletelist: []
    };
  },
  methods: {
    check() {
      if (this.checked === true) {
        this.shopList.forEach(item => {
          item.check = true;
        });
      } else {
        this.shopList.forEach(item => {
          item.check = false;
        });
      }
    },
    single() {
      this.checked = this.shopList.every(item => {
        return item.check === true;
      });
    },
    del() {
      this.shopList.forEach(item => {
        if (item.check === true) {
          this.deletelist.push(item.cid);
        }
        this.$dialog
          .confirm({
            title: "提示",
            message: "确认删除商品吗？"
          })
          .then(() => {
            axios
              .post("api/v1/deleteShop", this.deletelist)
              .then(res => {
                if (res.code === 200) {
                  this.$toast.success(res.msg);
                  this.$axios.req("api/v1/getCard",{}).then(res => {
                    this.shopList = res.shopList;
                  }).catch(err=>{
                    console.log(err);
                  })
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {});
      });
    },
    login(){
      this.$router.push('/login')
    },
    add(item){
      this.$axios.req('api/v1/editCart',{
        count:item.count,
        id:item.cid,
        mallPrice:item.mallPrice
      }).then(res=>{
        // console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  mounted() {
    axios
      .post("api/v1/getCard", {})
      .then(res => {
        if (res.code === 200) {
          this.shopList = res.shopList;
          console.log(this.shopList);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  created() {},
  filters: {},
  computed: {
    allprice() {
      let num = 0;
      this.shopList.forEach(item => {
        if (item.check === true) {
          num += item.present_price * item.count;
        }
      });
      return num;
    },
    user(){
      return this.$store.state.userInfo
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.van-row {
  background-color: white;
  border-bottom: 1px solid #ececec;
}
.title {
  font-size: 30px;
  background-color: white;
  width: 100%;
  text-align: center;
}
.check {
  height: 100px;
}
.box {
  height: 100px;
  width: 100%;
  line-height: 100px;
}
.allcheckbox {
  width: 30px;
  height: 30px;
}
.checkbox {
  width: 30px;
  height: 30px;
  margin-top: 80px;
}
.all {
  font-size: 20px;
}
.total {
  font-size: 20px;
}
.box2 {
  height: 100px;
  line-height: 50px;
  width: 100%;
  text-align: center;
}
.btn {
  width: 100%;
  height: 80px;
  background-color: white;
}
.allbtn {
  padding-top: 10px;
}
.del {
  width: 100px;
  height: 60px;
  background-color: #e34008;
  font-size: 20px;
  color: white;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
  float: left;
  border-radius: 5px;
  margin-left: 500px;
}
.settle {
  width: 100px;
  height: 60px;
  background-color: #e34008;
  font-size: 20px;
  color: white;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
  float: left;
  border-radius: 5px;
  margin-left: 10px;
}
.goods {
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #e3e3e3;
}
.img {
  width: 150px;
  height: 150px;
  border: 1px solid #eaeaea;
  margin: 20px 30px;
}
.goodsname {
  height: 200px;
}
.goodsprice {
  float: left;
  font-size: 26px;
  width: 60px;
}
.itemname {
  font-size: 26px;
  padding: 20px;
}
.step {
  float: left;
  font-size: 26px;
  margin-left: 140px;
}
.item {
  padding: 30px 20px;
}
  .login{
    background-color: white;
  font-size:30px;
    text-align: center;
    padding-top:60px ;
}
</style>
