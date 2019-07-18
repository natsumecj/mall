<template>
    <div>
        <van-row>
            <van-col span="24">
                <img :src="goods.image" alt="" width="100%">
            </van-col>
        </van-row>
        <van-row>
            <van-col span="24">
                <div class="goodsname">{{goods.name}}</div>
            </van-col>
            <van-col span="4">
                <div class="goodsprice">￥{{goods.present_price}}</div>
            </van-col>
        </van-row>
        <van-row type="flex" justify="space-around">
            <van-col span="6"><p>运费：{{goods.__v}}</p></van-col>
            <van-col span="6"><p>剩余：{{goods.amount}}</p></van-col>
            <van-col span="6"><p>取消收藏：<van-icon name="like-o" size="20px" /></p></van-col>
        </van-row>

        <div style="height: 50px;"></div>
    </div>
</template>

<script>
    export default {
        name: "Details",
        components: {},
        props: {},
        data() {
            return {
                ids:'',
                goods:"",
            }
        },
        methods: {},
        mounted() {
            this.ids=this.$route.query.id
            this.$axios.req('api/v1/goods/one?id='+this.ids)
                .then(res=>{
                    if(res){
                        // console.log(res);
                        this.goods=res.goods.goodsOne
                        console.log(this.goods);
                    }
                })
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
        .van-row{
            background-color: white;
            border-bottom: 0.5px solid #d4d4d4;
        }
    .goodsname{
        font-size: 16px;
        margin: 10px;
    }
    .goodsprice{
        color: red;
        margin-left: 10px;
    }
</style>