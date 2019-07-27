<template>
  <div>
    <van-row type="flex">
      <div class="go" @click="go">
        <van-icon name="arrow-left" color="#2086F0" size="20px" />
      </div>
      <div class="title">个人资料</div>
    </van-row>
    <van-row class="head">
      <van-col span="24">
        <div class="git">
          github
        </div>
      </van-col>
    </van-row>
    <van-row class="head">
      <van-col span="5">
        <div class="span">头像</div>
      </van-col>
      <van-col span="8" offset="11">
        <van-icon name="user-circle-o" color="red" size="70px" />
      </van-col>
    </van-row>
    <van-row class="head">
      <van-col span="6">
        <div class="users">用户名</div>
      </van-col>
      <van-col span="10">
          <div class="user">
              <van-cell-group>
                  <van-field
                          v-model="user.username"
                          placeholder="请输入性别"
                  />
              </van-cell-group>
          </div>
      </van-col>
    </van-row>
    <van-row class="head">
      <van-col span="6">
        <div class="users">
          昵称
        </div>
      </van-col>
      <van-col span="8">
        <div class="users">
            <van-cell-group>
                <van-field
                        v-model="user.nickname"
                        placeholder="请输入性别"
                />
            </van-cell-group>
        </div>
      </van-col>
    </van-row>
    <van-row class="head">
      <van-col span="6">
        <div class="users">
          性别
        </div>
      </van-col>
      <van-col span="8">
          <div class="users"><van-cell-group>
              <van-field
                      v-model="user.gender"
                      placeholder="请输入性别"
              />
          </van-cell-group></div>

      </van-col>
    </van-row>
    <van-row class="head">
      <van-col span="6">
        <div class="users">
          邮箱
        </div>
      </van-col>
      <van-col span="10">
        <div class="mail">
          <van-cell-group>
            <van-field
              v-model="user.mail"
              placeholder="请输入邮箱"
            />
          </van-cell-group>
        </div>
      </van-col>
    </van-row>
      <van-row class="head">
          <van-col span="6">
              <div class="users">
                  出生年月
              </div>
          </van-col>
          <van-col span="8">
              <div @click="up" class="users">{{birthday}}</div>
          </van-col>
      </van-row>
      <van-popup
              v-model="show"
              position="bottom"
              :style="{ height: '32%' }"
      >
          <van-datetime-picker
                  v-model="time"
                  type="date"
                  @confirm="determine"
          />
      </van-popup>
      <div class="users">
          <van-button type="primary" size="large" @click="onsave">保存</van-button>
      </div>
      <div class="users">
          <van-button type="default" size="large">取消</van-button>
      </div>
  </div>
</template>

<script>
    import axios from 'axios'
export default {
  name: "Personal",
  components: {},
  props: {},
  data() {
    return {
        user:[{mail:""},],
        show:false,
        time:"",
        birthday:'',
        users:{
            username:'',
            nickname:'',
            gender:'',
            year:'',
            month:'',
            day:'',
            mail:'',
            _id:'',
        },
        year: "",
        month: "",
        day: ""
    };
  },
  methods: {
    go() {
      this.$router.go(-1);
    },
      up(){
        this.show=true
      },
      determine(val){
          this.birthday= this.$momunt(val).format('YYYY年MM月DD日');
          this.year = this.$momunt(val)
              .format("YYYY")
              .toString();
          this.month = this.$momunt(val)
              .format("MM")
              .toString();
          this.day = this.$momunt(val)
              .format("DD")
              .toString();
       this.show=false
      },
      onsave(){
        this.users.nickname=this.user.nickname
        this.users.gender=this.user.gender
        this.users.year=this.year
        this.users.month=this.month
        this.users.day=this.day
        this.users.mail=this.user.mail
        this.users._id=this.user._id
          console.log(this.users);
          if(this.users===null){
              this.users.year=this.user.year
              this.users.month=this.user.month
              this.users.day=this.user.day
          }else{
              this.users.year=this.year
              this.users.month=this.month
              this.users.day=this.day
          }
        axios.post('api/v1/saveUser',this.users)
            .then(res=>{
                console.log(res);
                this.$toast.success(res.msg)
            }).catch(err=>{
            console.log(err);
        })
      }
  },
  mounted() {
      axios.post('api/v1/queryUser')
          .then(res=>{
              if(res.code===200){
                  console.log(res);
                  this.user=res.userInfo
                  this.birthday=res.userInfo.year+'年'+res.userInfo.month+'月'+res.userInfo.day+'日'
              }
              if(res.code===-1){
                  this.$router.go(-1)
                  this.$toast.fail(res.msg )
              }
          })
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
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
.git {
  padding: 20px;
  background-color: white;
  font-size: 26px;
}
.span {
  padding: 53px 20px;
  font-size: 26px;
}
.head {
  background-color: white;
  border-bottom: 1px solid #f0f0f0;
}
.user {
  color: #c8c8c8;
  padding: 20px;
  background-color: white;
  font-size: 26px;
}
.users {
  padding: 20px;
  background-color: white;
  font-size: 26px;
}
    .mail{
        padding: 20px 0;
        background-color: white;
        font-size: 26px;
    }
</style>
