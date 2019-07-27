<template>
  <div>
    <van-row>
      <van-col span="24">
        <div class="goodsimg">
          <div class="ret" @click="go">
            <van-icon name="arrow-left" size="16px" />
          </div>
          <img :src="goods.image" alt="" width="100%" />
        </div>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <div class="goodsname" v-if="goods">{{ goods.name }}</div>
      </van-col>
      <van-col span="4">
        <div class="goodsprice" v-if="goods">￥{{ goods.present_price }}</div>
      </van-col>
    </van-row>
    <van-row type="flex" justify="space-around">
      <van-col span="6"
        ><p>运费：{{ goods.__v }}</p></van-col
      >
      <van-col span="6"
        ><p>剩余：{{ goods.amount }}</p></van-col
      >
      <van-col span="6"
        ><p class="like" @click="likes" v-if="like === false">
          收藏：<van-icon name="like-o" size="20px" />
        </p>
        <p v-else @click="unlikes">
          取消收藏：<van-icon name="like" size="20px" color="red" /></p
      ></van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <van-cell value="进入店铺" is-link icon="shop-o">
          <template slot="title">
            <span class="custom-title">有赞的店</span>
            <van-tag type="danger">官方</van-tag>
          </template>
        </van-cell>
      </van-col>
    </van-row>
    <van-tabs v-model="active">
      <van-tab title="商品详情">
        <div v-html="goods.detail"></div>
      </van-tab>
      <van-tab title="商品评论">内容 2</van-tab>
    </van-tabs>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="jioncar"
      />
      <van-goods-action-button type="danger" text="立即购买" @click="buy" />
    </van-goods-action>
    <van-popup v-model="show" position="bottom" :style="{ height: '33%' }">
      <div class="god">
        <div class="img">
          <img :src="goods.image" alt="" width="100%" />
        </div>
        <div class="pop">
          <div class="goodsname">
            {{ goods.name }}
          </div>
          <div class="goodsprice">￥{{ goods.present_price }}</div>
        </div>
      </div>
      <van-row>
        <van-col span="12" offset="1">
          <div>
            购买数量：
          </div>
          <div>
            <p>
              剩余：{{ goods.amount }}件
              <span class="goodsprice">每人限购50件</span>
            </p>
          </div>
        </van-col>
        <van-col span="9">
          <div class="step">
            <van-stepper
              v-model="value"
              min="1"
              max="50"
              integer
              button-size="28px"
            />
          </div>
        </van-col>
      </van-row>
      <br />
      <br />
      <van-row>
        <van-col span="24">
          <van-button type="danger" block>立即购买</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Details",
  components: {},
  props: {},
  data() {
    return {
      ids: "",
      goods: "",
      active: 0,
      grows: [],
      show: false,
      value: 1,
      like: false
    };
  },
  methods: {
    go() {
      this.$router.go(-1);
    },
    onClickIcon() {
      this.$router.push("/cart");
    },
    jioncar() {
      axios
        .post("api/v1/addShop", {
          id: this.ids
        })
        .then(res => {
          if (res.code === 200) {
            this.$toast.success(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    buy() {
      this.show = true;
    },
    likes() {
      this.like = true;
      axios
        .post("api/v1/collection", this.goods)
        .then(res => {
          this.$toast.success(res.msg);
        })
        .catch(err => {
          console.log(err);
        });
    },
    unlikes() {
      this.like = false;
      axios
        .post("api/v1/cancelCollection", {
          id: this.ids
        })
        .then(res => {
          // console.log(res);
          this.$toast.success(res.msg);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.ids = this.$route.query.id;
    // this.goods = this.$route.query.item;
    //   console.log(this.ids);
    // if (this.goods) this.ids = this.goods.id;
    this.$axios
      .req("api/v1/goods/one?id=" + this.ids)
      .then(res => {
        if (res) {
          // console.log(res);
          this.goods = res.goods.goodsOne;
          // console.log(this.goods);
          this.grows = JSON.parse(localStorage.getItem("goods"));
          this.grows.push(this.goods);
          localStorage.setItem("goods", JSON.stringify(this.grows));
          console.log(JSON.parse(localStorage.getItem("goods")));
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .req("api/v1/isCollection", {
        id: this.ids
      })
      .then(res => {
        // console.log(res);
        if (res.isCollection === 1) {
          this.like = true;
        } else {
          this.like = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.goodsimg {
  width: 100%;
}
.ret {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: gray;
  color: white;
  text-align: center;
  line-height: 50px;
  margin: 16px;
}
.van-row {
  background-color: white;
  border-bottom: 0.5px solid #d4d4d4;
}
.goodsname {
  font-size: 16px;
  margin: 10px;
}
.goodsprice {
  color: red;
  margin-left: 10px;
}
.like {
  vertical-align: middle;
  width: 180px;
}
.van-icon {
  vertical-align: middle;
}
.van-cell {
  vertical-align: middle;
}
.img {
  width: 180px;
  height: 180px;
  border: 1px solid #eaeaea;
  margin-left: 30px;
  float: left;
}
.pop {
  margin: 20px;
  float: left;
}
.god {
  height: 210px;
  border-bottom: 1px solid #ebebeb;
}
.step {
  margin: 10px 60px;
}
</style>
