<template>
    <div>
        <div class="box">
            <div class="box2">
                <div class="title">登录/注册</div>
                <br>
                <div>
                    <van-cell-group>
                        <van-field v-model="name" placeholder="请输入用户名"/>
                    </van-cell-group>
                    <br>
                    <van-cell-group>
                        <van-field v-model="pass" placeholder="请输入密码" type="password"/>
                    </van-cell-group>
                </div>
                <br>
                <van-row>
                    <van-col span="16">
                        <van-cell-group>
                            <van-field
                                    v-model="validate"
                                    label="验证码"
                                    type="textarea"
                                    placeholder="请输入验证码"
                                    rows="1"
                                    autosize
                            />
                        </van-cell-group>
                    </van-col>
                    <van-col span="8">
                        <span v-html="verify" @click="verifys"></span>
                    </van-col>
                </van-row>
                <div class="login">
                    <van-row>
                        <van-col span="8" >
                            <van-button type="primary" size="large" @click="login">
                                登录
                            </van-button>
                        </van-col>
                        <van-col span="8" offset="4">
                            <van-button type="danger" size="large" @click="register">注册</van-button>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        components: {},
        props: {},
        data() {
            return {
                name:"",
                pass:"",
                validate:"",
                verify:""
            }
        },
        methods: {
            verifys(){
                this.$axios
                    .req("api/v1/verify")
                    .then(response=>{
                        this.verify=response
                    })
            },
            login(){
                this.$axios.req('api/v1/login',{
                    nickname:this.name,
                    password:this.pass,
                    verify:this.validate,
                }).then(res=>{
                    if(res.code===200){
                        this.$toast.success(res.msg)
                        this.$store.state.userInfo=res.userInfo
                        localStorage.setItem("user",JSON.stringify(this.$store.state.userInfo))
                        this.$router.push('/person')
                    }
                    if(res.code===-1){
                        this.$toast.fail(res.msg)
                        this.name=''
                        this.pass=''
                        this.validate=''
                        this.$axios
                            .req("api/v1/verify")
                            .then(response=>{
                                this.verify=response
                            })
                    }
                    if(res.code===-2){
                        this.$toast.fail(res.msg)
                        this.validate=''
                        this.$axios
                            .req("api/v1/verify")
                            .then(response=>{
                                this.verify=response
                            })
                    }
                })
            },
            register(){
                this.$axios.req('api/v1/register',{
                    nickname:this.name,
                    password:this.pass,
                    verify:this.validate,
                })
                    .then(res=>{
                        if(res.code===200){
                            this.$toast.success(res.msg)
                            this.$store.state.userInfo=res.userInfo
                            localStorage.setItem("user",JSON.stringify(this.$store.state.userInfo))
                            this.$router.push('/person')
                        }
                        if(res.code===-1){
                            this.$toast.fail(res.msg)
                            this.name=''
                            this.pass=''
                            this.validate=''
                            this.$axios
                                .req("api/v1/verify")
                                .then(response=>{
                                    this.verify=response
                                })
                        }
                        if(res.code===-2){
                            this.$toast.fail(res.msg)
                            this.validate=''
                            this.$axios
                                .req("api/v1/verify")
                                .then(response=>{
                                    this.verify=response
                                })
                        }
                    }).catch(err=>{
                    console.log(err);
                })
            }
        },
        mounted() {
            this.$axios
                .req("api/v1/verify")
                .then(response => {
                    this.verify = response;
                    // console.log(this.verify);
                })
                .catch(error => {
                    console.log(error);
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
    .box{
        background: url("../assets/1557703765454.jpeg");
        background-size: cover;
        height:1280px;
    }
    .box2{
        width: 92%;
        background-color: white;
        position: absolute;
        top: 100px;
        left: 28px;
    }
    .title{
        margin-right: 230px;padding: 10px;font-size: 20px;font-weight: bold
    }
    .login{
        margin: 30px;
    }
</style>