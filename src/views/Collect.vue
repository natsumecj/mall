<template>
    <div>
        <van-row type="flex">
            <div class="go" @click="go"><van-icon name="arrow-left" color="#2086F0" size="20px"/></div>
            <div class="title">我的收藏</div>
        </van-row>
        <van-row>
            <div class="goods" v-for="(item, index) in shopList" :key="item.cid">
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
                        </div>
                    </div>
                </van-col>
                <van-col span="3" align="center" class="close">
                    <div @click="del(item)"><van-icon name="close" size="20px"/></div>
                </van-col>
            </div>

        </van-row>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Collect",
        components: {},
        props: {},
        data() {
            return {
                shopList:[],
            }
        },
        methods: {
            go(){
                this.$router.go(-1)
            },
            del(item){
                axios.post('api/v1/cancelCollection',{
                    id:item.cid
                })
                    .then(res=>{
                        // console.log(res);
                        this.$axios.req('api/v1/collection/list')
                            .then(res=>{
                                // console.log(res);
                                this.shopList=res.data.list
                                console.log(this.shopList);
                            }).catch(err=>{
                            console.log(err);
                        })
                        this.$toast.success(res.msg)
                    }).catch(err=>{
                    console.log(err);
                })
            }
        },
        mounted() {
        this.$axios.req('api/v1/collection/list')
            .then(res=>{
                console.log(res);
                this.shopList=res.data.list
                console.log(this.shopList);
            }).catch(err=>{
            console.log(err);
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
.title {
    font-size: 30px;
    background-color: white;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    padding: 20px 0;
}
    .go{
        background-color: white;
        padding: 20px 0;
        border-bottom: 1px solid #f0f0f0;
    }
.goods {
    width: 100%;
    height: 200px;
    border-bottom: 1px solid #e3e3e3;
    background-color: white;
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
.itemname {
    font-size: 26px;
    padding: 20px;
}
.item {
    padding: 30px 20px;
}
.goodsprice {
    float: left;
    font-size: 26px;
    width: 60px;
    font-weight: bold;
    color: red;
}
    .close{
        margin-top: 80px;
    }
</style>