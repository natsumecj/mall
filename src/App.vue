<template>
  <div id="app">
    <router-view />
    <buttom v-if="$route.meta.show"></buttom>
  </div>
</template>
<script>
import buttom from "./views/Buttom";
export default {
  components: {
    buttom
  },
  data() {
    return {};
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("goods"))===null) {
      let arr = [];
      localStorage.setItem("goods", JSON.stringify(arr));
    }
  }
};
</script>
<style lang="scss">
#app {
  background-color: #f2f2f2;
  font-size: 13px;
}
</style>
