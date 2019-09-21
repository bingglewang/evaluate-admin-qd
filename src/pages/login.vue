<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>在线评估后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input  v-model="loginForm.username" placeholder="用户名" id="loginAccount" prefix-icon="iconfont icon-dengluyonghuming1" @keyup.enter.native="submit"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password" prefix-icon="iconfont icon-denglushimima" @keyup.enter.native="submit"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        loginForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        },
        showLogin: false,
      }
    },
    mounted(){
      this.showLogin = true;
      setTimeout(()=>{
        let yonghuming = document.getElementById('loginAccount');
        yonghuming.focus();
      },1000);
    },
    computed: {
    },
    methods: {
      submit(e){
        if(e.keyCode - 13 == 0){
          this.submitForm('loginForm');
        }
      },
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            _this.$post('/admin/login',{account: this.loginForm.username, password: this.loginForm.password}).then(res=>{
            if (res.status == 0) {
              let user = {
                token:res.token
              }
              _this.$store.commit('setUser',user);
              _this.$router.push('/home')
            }else{
              _this.$message({
                type: 'error',
                message: res.msg
              });
            }
            });
          } else {
            _this.$notify.error({
              title: '错误',
              message: '请输入用户名或密码',
              offset: 100
            });
            return false;
          }
        });
      },
    },
    watch: {
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/style/mixin';
  .login_page{
    /*background-color: #324057;*/
    /*图片背景自适应*/
    background-image:url(../assets/images/loginBackground.jpg);
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }
  .manage_tip{
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p{
      font-size: 34px;
      color: #fff;
    }
  }
  .form_contianer{
    .wh(300px, 160px);
    .ctp(320px, 210px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #c5c8cf;
    .submit_btn{
      width: 100%;
      font-size: 16px;
    }
    .el-input__inner{
      border-radius: 27px !important;
    }
  }
  .tip{
    font-size: 12px;
    color: red;
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
