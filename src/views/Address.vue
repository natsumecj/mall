<template>
  <div>
    <van-row type="flex">
      <div class="go" @click="go">
        <van-icon name="arrow-left" color="#2086F0" size="20px" />
      </div>
      <div class="title">地址列表</div>
    </van-row>
    <div class="addres">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="sel"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Address",
  components: {},
  props: {},
  data() {
    return {
      chosenAddressId: "1",
      list: []
    };
  },
  methods: {
    go() {
      this.$router.go(-1);
    },
    onAdd() {
      this.$router.push("/edit");
    },
    onEdit(item, index) {
      this.$router.push({ name: "edit", query: { item: item } });
    },
    sel(item, index) {
      console.log(item);
      this.$axios
        .req("api/v1/setDefaultAddress", { id: item._id })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$axios
      .req("api/v1/getAddress")
      .then(res => {
        console.log(res);
        this.list = res.address;
        this.list.forEach((item, index) => {
          item.id = index;
          if (item.isDefault === true) {
            this.chosenAddressId = index;
          }
        });
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
.addres {
  background-color: white;
}
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
