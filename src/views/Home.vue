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
        style="flex: 2;"
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
          >
            <img :src="item.image" alt="" style="width:50px;height:50px;" />
            <div>{{ item.mallCategoryName }}</div>
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
      <van-col span="24">
        <van-panel title="商品推荐">
          <div class="wrapper" ref="wrapper">
            <ul class="content">
              <li v-for="(item, index) in tab.recommend" :key="item.goodsId">
                <div class="recommendgoods">
                  <img :src="item.image" alt="" />
                  <p>{{ item.goodsName }}</p>
                  <p>
                    ￥{{ item.mallPrice }}
                    <s style="font-size: 10px;color: #747474">{{
                      item.price
                    }}</s>
                  </p>
                  <div style="display: flex;padding: 5px">
                    <div
                      style="background-color: #d9c20c;padding: 5px;flex: 1;border-radius:5px;text-align: center"
                    >
                      <van-icon
                        name="shopping-cart"
                        size="20px"
                        color="white"
                      ></van-icon>
                    </div>
                    <div
                      style="padding: 5px;background-color: #c43a04;font-size: 15px;flex: 2;border-radius:5px;color: white;text-align: center"
                      @click="goods(item.goodsId)"
                    >
                      查看详情
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-panel>
      </van-col>
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
          @click="todetails(item.goodsId)"
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
          {{ tab.floorName.floor2}}
        </div>
      </div>
    </van-row>
    <van-row>
      <div class="thing">
        <div
          v-for="(item, index) in tab.floor2"
          :key="item.goodsId"
          class="floorgoods"
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
        >
          <img :src="item.image" alt="" />
          <p class="hotgoodsname">{{ item.name }}</p>
          <p class="hotgoodsprice">
            ￥{{ item.mallPrice }}
            <s style="font-size: 10px;color: #747474">{{ item.price }}</s>
          </p>
        </div>
      </div>
    </van-row>
  </div>
</template>

<script>
import BScroll from "better-scroll";
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
    todetails(id) {
      this.$router.push({ name: "details", query: { id: id } });
      console.log(id);
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
  font-size: 14px;
}
.swipe {
  width: 100%;
}
.classification {
  margin: 15px;
  display: flex;
  height: 80px;
  background-color: #ffffff;
  border-radius: 5px;
}
.wrapper {
  width: 100%;
  overflow: hidden;
}
.content {
  display: flex;
  width: 575%;
}
.recommendgoods {
  width: 125px;
  border: 1px solid #e0e0e0;
  p {
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
    padding: 5px;
  }
}
.recommendgoods > img {
  width: 100%;
}
.floor {
  background-color: #b01e08;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  text-align: center;
  line-height: 20px;
  color: white;
  font-weight: bold;
  float: left;
}
.floorname {
  color: #b01e08;
  font-weight: bold;
  font-size: 16px;
  float: left;
}
.thing {
  background-color: white;
}
.floorgoods {
  width: 49%;
  float: left;
  display: flex;
  border:1px solid #8a8a8a;
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
}
.hotgoodsprice {
  font-size: 15px;
  margin: 0px;
  text-align: center;
  font-weight: bold;
  color: red;
}
</style>
