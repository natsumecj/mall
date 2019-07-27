<template>
    <div>
        <van-row type="flex">
            <div class="go" @click="go">
                <van-icon name="arrow-left" color="#2086F0" size="20px" />
            </div>
            <div class="title">编辑地址</div>
        </van-row>
       <div class="ads">
           <van-address-edit
                   :area-list="areaList"
                   show-delete
                   show-set-default
                   @save="onSave"
                   @delete="onDelete"
                   :address-info="item"
                   v-if="item"
           />
           <van-address-edit
                   :area-list="areaList"
                   show-delete
                   show-set-default
                   @save="onSave"
                   @delete="onDelete"
                   v-else
           />
       </div>
    </div>
</template>

<script>
    import areaList from '../js/area'
    import axios from 'axios'
    export default {
        name: "Edit",
        components: {},
        props: {},
        data() {
            return {
                areaList,
                searchResult: [],
                item:'',
            }

        },
        methods: {
            go() {
                this.$router.go(-1);
            },
            onSave(content) {
                console.log(content);
                let ads=content.province+content.city+content.county+content.addressDetail
                axios.post('api/v1/address',{
                    name:content.name,
                    tel:content.tel,
                    address:ads,
                    isDefault:content.isDefault,
                    province:content.province,
                    city:content.city,
                    county:content.county,
                    addressDetail:content.addressDetail,
                    areaCode:content.areaCode,
                    id:content._id
                })
                    .then(res=>{
                        if(res.code===200){
                            this.$toast.success(res.msg)
                            this.$router.push('/address')
                        }
                    }).catch(err=>{
                    console.log(err);
                })
            },
            onDelete() {
                    this.$axios.req('api/v1/deleteAddress',{id:this.item._id}).then(res=>{
                        // console.log(res);
                        this.$toast.success(res.msg)
                        this.$router.push('/address')
                    }).catch(err=>{
                        console.log(err);
                    })
            },
        },
        mounted() {
        this.item=this.$route.query.item
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
    .ads{
        background-color: white;
    }
</style>