<template>
    <div>
        <van-row type="flex">
            <div class="go" @click="go">
                <van-icon name="arrow-left" color="#2086F0" size="20px" />
            </div>
            <div class="title">我的订单</div>
        </van-row>
            <van-tabs v-model="active" animated>
                <van-tab title="全部">1</van-tab>
                <van-tab title="待支付">2</van-tab>
                <van-tab title="待发货">3</van-tab>
                <van-tab title="待收货">4</van-tab>
                <van-tab title="已完成">5</van-tab>
            </van-tabs>
    </div>
</template>

<script>
    export default {
        name: "Order",
        components: {},
        props: {},
        data() {
            return {
                active:0,
            }
        },
        methods: {
            go() {
                this.$router.go(-1);
            },
        },
        mounted() {

        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
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