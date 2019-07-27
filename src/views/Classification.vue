<template>
  <div>
    <van-row>
      <van-nav-bar title="商品分类" />
    </van-row>
    <div class="sides">
      <div v-for="(item, index) in tab" :key="item.mallCategoryId">
        <div
          id="cate"
          :class="{ cla: ind === index }"
          @click="change(item, index)"
        >
          {{ item.mallCategoryName }}
        </div>
      </div>
    </div>
    <div class="rig">
      <van-tabs v-model="active" @click="jumps">
        <van-tab
          v-for="(item, index) in sign"
          :key="item.mallSubId"
          :title="item.mallSubName"
        >
          <div
            v-for="(item, index) in datalist"
            :key="item.id"
            class="box"
            @click="goodOne(item,item.id)"
          >
            <img :src="item.image" />
            <p class="name">
              {{ item.name }}
            </p>
            <p class="price">
              {{ "￥" + item.present_price }}&nbsp;&nbsp;<s
                style="color: #747474"
                >{{ item.orl_price }}</s
              >
            </p>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="btm"></div>
  </div>
</template>
<script>
export default {
  name: "classification",
  data() {
    return {
      tab: [],
      ind: 0,
      sign: [],
      active: 0,
      datalist: [],
    };
  },
  methods: {
    change(item, index) {
      // console.log(index);
      this.active = 0;
      this.ind = index;
      this.sign = item.bxMallSubDto;
      this.$axios
        .req("api/v1/classification?mallSubId=" + this.sign[0].mallSubId)
        .then(res => {
          if (res) {
            this.datalist = res.dataList;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    jumps(index) {
      this.$axios
        .req("api/v1/classification?mallSubId=" + this.sign[index].mallSubId)
        .then(res => {
          if (res) {
            this.datalist = res.dataList;
            // console.log(this.datalist);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goodOne(item,id) {
      this.$router.push({
        name: "details",
        query: {
          item: item,
          id:id
        }
      });
    }
  },
  mounted() {
    this.$axios
      .req("api/v1/recommend")
      .then(res => {
        if (res) {
          this.tab = res.data.category;
          // console.log(this.tab);
        }
        if (this.$route.params.index !== undefined) {
          this.ind = this.$route.params.index;
          this.sign = this.tab[this.ind].bxMallSubDto;
          this.$axios
            .req("api/v1/classification?mallSubId=" + this.sign[0].mallSubId)
            .then(res => {
              if (res) {
                this.datalist = res.dataList;
                // console.log(this.datalist);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.ind = 0;
          this.sign = this.tab[0].bxMallSubDto;
          this.$axios
            .req("api/v1/classification?mallSubId=" + this.sign[0].mallSubId)
            .then(res => {
              if (res) {
                this.datalist = res.dataList;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="scss" scoped>
.sides {
  width: 25%;
  float: left;
  height: 100%;
  background-color: #efefef;
}
#cate {
  height: 80px;
  width: 100%;
  background-color: #efefef;
  font-size: 28px;
  text-align: center;
  line-height: 80px;
  border-bottom: 0.5px solid #fafafa;
}
.rig {
  width: 75%;
  float: left;
}
.cla {
  background-color: #fff !important;
}
.box {
  height: 200px;
  border-bottom: 1px solid #d5d5d5;
  background-color: white;
}
img {
  width: 160px;
  height: 160px;
  border: 1px solid #d5d5d5;
  margin-top: 10px;
  float: left;
}
.name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 340px;
  font-weight: bold;
  font-size: 15px;
  color: red;
  float: left;
  padding: 10px;
  text-align: left;
  margin-top: 10px;
}
.price {
  color: red;
  font-weight: bold;
  font-size: 15px;
  float: left;
  padding: 5px;
  margin: 0;
}
.btm {
  height: 70px;
  width: 100%;
}
</style>
