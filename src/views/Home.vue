<template>
  <div class="home">
    <van-row type="flex">
      <div class="city">城市</div>
      <van-search
        shape="round"
        background="#f2f2f2"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        style="flex: 2"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </van-row>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in tab.slides" :key="item.goodsId">
        <img :src="item.image" alt="" class="swipe" />
      </van-swipe-item>
    </van-swipe>
    <van-row type="flex">
      <van-col :span="24">
        <div class="classification">
          <div
            v-for="(item, index) in tab.category"
            :key="item.mallCategoryId"
            style="flex:1;padding: 6px;text-align: center"
            @click="cate(index)"
          >
            <img :src="item.image" alt="" />
            <div class="mallname">{{ item.mallCategoryName }}</div>
          </div>
        </div>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <img
          :src="tab.advertesPicture.PICTURE_ADDRESS"
          alt=""
          style="width: 100%;margin-bottom: 10px"
          v-if="tab.advertesPicture"
        />
      </van-col>
    </van-row>
    <van-row>
      <van-panel title="商品推荐">
        <div class="wrapper" ref="wrapper">
          <ul class="content">
            <li v-for="(item, index) in tab.recommend" :key="item.goodsId">
              <div class="recommendgoods">
                <img :src="item.image" alt="" />
                <p>{{ item.goodsName }}</p>
                <p>
                  ￥{{ item.mallPrice }}
                  <s class="ss">{{ item.price }}</s>
                </p>
                <div style="display: flex;padding: 5px">
                  <div class="car" @click="cart(item)">
                    <van-icon
                      name="shopping-cart"
                      size="20px"
                      color="white"
                    ></van-icon>
                  </div>
                  <div class="det" @click="todetails(item)">
                    查看详情
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-panel>
    </van-row>
    <van-row type="flex" justify="center">
      <div style="padding: 10px">
        <div class="floor">
          1F
        </div>
        <div class="floorname" v-if="tab.floorName">
          {{ tab.floorName.floor1 }}
        </div>
      </div>
    </van-row>
    <van-row>
      <div class="thing">
        <div
          v-for="(item, index) in tab.floor1"
          :key="item.goodsId"
          class="floorgoods"
          @click="todetails(item)"
        >
          <img :src="item.image" alt="" />
        </div>
      </div>
    </van-row>
    <van-row type="flex" justify="center">
      <div style="padding: 10px">
        <div class="floor">
          2F
        </div>
        <div class="floorname" v-if="tab.floorName">
          {{ tab.floorName.floor2 }}
        </div>
      </div>
    </van-row>
    <van-row>
      <div class="thing">
        <div
          v-for="(item, index) in tab.floor2"
          :key="item.goodsId"
          class="floorgoods"
          @click="todetails(item)"
        >
          <img :src="item.image" alt="" />
        </div>
      </div>
    </van-row>
    <van-row type="flex" justify="center">
      <div style="padding: 10px">
        <div class="floor">
          3F
        </div>
        <div class="floorname" v-if="tab.floorName">
          {{ tab.floorName.floor3 }}
        </div>
      </div>
    </van-row>
    <van-row>
      <div class="thing">
        <div
          v-for="(item, index) in tab.floor3"
          :key="item.goodsId"
          class="floorgoods"
          @click="todetails(item)"
        >
          <img :src="item.image" alt="" />
        </div>
      </div>
    </van-row>
    <van-row type="flex" justify="center">
      <div style="padding: 10px">
        <div class="floorname">
          热销产品
        </div>
      </div>
    </van-row>
    <van-row>
      <div class="thing">
        <div
          v-for="(item, index) in tab.hotGoods"
          :key="item.goodsId"
          class="hotgoods"
          @click="todetails(item)"
        >
          <img :src="item.image" alt="" />
          <p class="hotgoodsname">{{ item.name }}</p>
          <p class="hotgoodsprice">
            ￥{{ item.mallPrice }}
            <s class="ss">{{ item.price }}</s>
          </p>
        </div>
      </div>
    </van-row>
      <br>
      <br>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import axios from "axios"
export default {
  name: "home",
  components: {},
  data() {
    return {
      value: "",
      tab: {}
    };
  },
  methods: {
    onSearch() {},
    todetails(item) {
      this.$router.push({ name: "details", query: { id: item.goodsId } });
      // console.log(id);
    },
    cate(index){
      this.$router.push({
        name:'classification',
        params:{
          index:index
        }
      })
      // this.$store.state.actives=1
    },
    cart(item){
      axios
              .post("api/v1/addShop", {
                id: item.goodsId
              })
              .then(res => {
                if (res.code === 200) {
                  this.$toast.success(res.msg);
                }
              })
              .catch(err => {
                console.log(err);
              });
    }
  },
  mounted() {
    this.$axios
      .req("api/v1/recommend")
      .then(res => {
        if (res) {
          this.tab = res.data;
          console.log(this.tab);
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.$nextTick(() => {
      new BScroll(this.$refs.wrapper, {
        scrollX: true,
        startX: true,
        scrollY: false,
        startY: false
      });
    });
  }
};
</script>
<style scoped lang="scss">
.city {
  padding: 15px 0px 10px 15px;
  font-size: 16px;
}
.swipe {
  width: 100%;
}
.classification {
  margin: 15px;
  display: flex;
  background-color: #ffffff;
  border-radius: 5px;
  img {
    width: 100%;
  }
}
.mallname {
  font-size: 22px;
}
.wrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
}
.content {
  display: flex;
}
.recommendgoods {
  width: 250px;
  border: 1px solid #e0e0e0;
  p {
    font-size: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
    padding: 5px;
  }
}
.ss {
  font-size: 20px;
  color: #747474;
}
.recommendgoods > img {
  width: 100%;
}
.car {
  background-color: #d9c20c;
  padding: 5px;
  flex: 1;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
}
.det {
  padding: 5px;
  background-color: #c43a04;
  font-size: 16px;
  flex: 2;
  border-radius: 5px;
  color: white;
  text-align: center;
}
.floor {
  background-color: #b01e08;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  text-align: center;
  line-height: 40px;
  color: white;
  font-size: 28px;
  font-weight: bold;
  float: left;
}
.floorname {
  color: #b01e08;
  font-weight: bold;
  font-size: 32px;
  float: left;
}
.thing {
  background-color: white;
}
.floorgoods {
  width: 49.4%;
  float: left;
  display: flex;
  border: 1px solid #dadada;
}
.floorgoods > img {
  width: 100%;
}
.hotgoods {
  width: 49.4%;
  border: 1px solid #e1e1e1;
  float: left;
  background-color: white;
  /*display: flex;*/
}
.hotgoods > img {
  width: 100%;
}
.hotgoodsname {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #ff3211;
  text-align: center;
  margin: 0;
  font-size: 20px;
}
.hotgoodsprice {
  font-size: 15px;
  margin: 0px;
  text-align: center;
  font-weight: bold;
  color: red;
  font-size: 20px;

}
</style>
