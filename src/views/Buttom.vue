<template>
    <div>
        <van-tabbar
                v-model="active"
                active-color="red"
                inactive-color="#000"
        >
            <van-tabbar-item icon="wap-home" @click="home">商城</van-tabbar-item>
            <van-tabbar-item icon="wap-nav" @click="cla">分类</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart" @click="car">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" @click="person">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "Button",
        components: {},
        props: {},
        data() {
            return {
                active:0,
            }
        },
        methods: {
            home(){
                this.$router.push('/')
            },
            cla(){
                this.$router.push('/classification')
            },
            person(){
                this.$router.push('/person')
            },
            car(){
                this.$router.push('/cart')
            }
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

</style>