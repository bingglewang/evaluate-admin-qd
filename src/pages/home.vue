<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="2" :class="menuClass" :style="showAndHideStyle">
        <el-menu class="el-menu-vertical-demo"
                 background-color="#324057"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :default-active="defaultActive"
                 :collapse-transition="false"
                 :collapse="isCollapse"
                 router>
          <!--<el-menu-item index="home"><i class="el-icon-menu"></i><span>首页</span></el-menu-item>-->
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i><span>数据管理</span></template>
            <el-menu-item index="userList"><span>用户列表</span></el-menu-item>
            <el-menu-item index="recordList"><span>查询列表</span></el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i><span>设置</span></template>
            <!--<el-menu-item index="paramConfig"><span>参数设置</span></el-menu-item>-->
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-warning"></i><span>说明</span></template>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="22" :style="showAndHideStyle1" :class="menuClass1">
        <div class="header_container">
          <img src="@/assets/images/home_hide.png" class="show-image" v-if="isHideTitle" width="25px" height="25px"
               @click="doShowAndHideMenu"/>
          <img src="@/assets/images/home_show.png" class="show-image" v-else width="25px" height="25px"
               @click="doShowAndHideMenu"/>
          <el-breadcrumb>
            <el-breadcrumb-item
              separator='/'
              v-for="(item,index) in breadlist"
              :key='index'
              :to="{path:item.path}">
              {{item.meta.CName}}
            </el-breadcrumb-item>
          </el-breadcrumb>


          <el-dropdown @command="handleCommand" menu-align='start' class="head-right">
            <img class="avator" src="@/assets/images/default.jpg"/>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="home">首页</el-dropdown-item>
              <el-dropdown-item command="updatePassword">密码修改</el-dropdown-item>
              <el-dropdown-item command="singout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="line-height: 60px;height: 60px;float: right;margin-right: 10px;font-size: 15px">默认管理员</span>
        </div>
        <router-view></router-view>
      </el-col>
    </el-row>

    <!--密码修改-->
    <el-dialog
      title="管理员密码修改"
      :visible.sync="centerDialogVisible"
      width="30%"
      modal
      center>
      <el-form label-width="100px">
        <el-form-item label="原始密码">
          <span style="color: red">*</span>
          <el-input type="password"
                    placeholder="请输入原始密码"
                    v-model="oldPwd"
                    style="width: calc(100% - 50px)">
          </el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <span style="color: red">*</span>
          <el-input type="password"
                    placeholder="请输入新密码"
                    v-model="newPwd"
                    style="width: calc(100% - 50px)">
          </el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <span style="color: red">*</span>
          <el-input type="password"
                    placeholder="请再次输入新密码"
                    v-model="reNewPwd"
                    style="width: calc(100% - 50px)">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="float: right">确定</el-button>
          <el-button @click="cancle" style="float: right;margin-right: 15px">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //密码修改
        oldPwd: '',
        newPwd: '',
        reNewPwd: '',
        centerDialogVisible: false,
        breadlist: '',
        //控制展开和收起左侧导航菜单
        menuHomeImg: 'display: inline-block;height: 60px;position: relative;top:6px;',
        menuClass1: 'side-menu-content animated',
        menuClass: 'side-menu animated',
        showAndHideStyle1: 'height: 100%;overflow: hidden;',
        showAndHideStyle: '',
        isCollapse: false,
        isHideTitle: true
        //控制展开和收起左侧导航菜单
      };
    },
    computed: {
      defaultActive: function () {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
      this.getBread();
    },
    watch: {
      $route() {
        this.getBread();
      }
    },
    methods: {
      onSubmit() {
        let _this = this;
        if(this.oldPwd != '' && this.newPwd != ''){
          if(this.newPwd != this.reNewPwd){
            this.$message.error('两次密码输入不一致!');
            return false;
          }else{
            let changePwd = {
              token: JSON.parse(window.localStorage.user).token,
              newPwd:_this.newPwd,
              password:_this.oldPwd
            }
            this.$post('/admin/changeAdminPwd',changePwd).then(resPwd=>{
              if(resPwd.status == 0){
                this.$store.commit('logout');
                this.$message({
                  type: 'success',
                  message: '修改成功'
                });
                this.$router.push('/');
              }else {
                this.$message.error(resPwd.msg);
              }
            })
          }

        }else if(this.oldPwd == ''){
          this.$message.error('请输入原始密码');
          return false;
        }else if(this.newPwd == ''){
          this.$message.error('请输入新密码');
          return false;
        }
      },
      cancle() {
        this.centerDialogVisible = false;
        this.oldPwd = '';
        this.newPwd = '';
        this.reNewPwd = '';
      },
      handleCommand(command) {
        if (command == 'home') {
          this.$router.push('/home');
        } else if (command == 'singout') {
          this.$store.commit('logout');
          if (window.localStorage.user == undefined) {
            this.$message({
              type: 'success',
              message: '退出成功'
            });
            this.$router.push('/');
          } else {
            this.$message({
              type: 'error',
              message: '退出失败'
            });
          }
        } else if (command == 'updatePassword') {
          this.centerDialogVisible = true;
        }
      },
      getBread() {
        this.breadlist = this.$route.matched;
        console.log(444, this.$route.matched);
        /* this.$route.matched.forEach((item, index) => {
           //先判断父级路由是否是空字符串或者meta是否为首页，直接复写路径到根路径
           item.meta.CName === '首页' ? item.path = '/' : this.$route.path === item.path;
         });*/
      },
      //控制展开和收起左侧导航菜单
      doShowAndHideMenu() {
        this.isCollapse = !this.isCollapse;
        this.isHideTitle = !this.isHideTitle;
        if (this.isCollapse) {
          this.showAndHideStyle = 'width:65px';
          this.showAndHideStyle1 = 'height: 100%;overflow: hidden;width: calc(100% - 65px)';
          this.menuClass1 = 'side-menu-content animated hideSlide';
          this.menuClass = 'side-menu animated hideSlide';
          this.menuHomeImg = 'display: inline-block;height: 60px;position: relative;top:17px;'
        } else {
          this.showAndHideStyle = '';
          this.showAndHideStyle1 = 'height: 100%;overflow: hidden;';
          this.menuClass = 'side-menu animated showSlide'
          this.menuClass1 = 'side-menu-content animated showSlide';
          this.menuHomeImg = 'display: inline-block;height: 60px;position: relative;top:6px;'
        }
      },
    }
  }
</script>


<style lang="less" scoped>
  @import '../assets/style/mixin';

  .manage_page {

    .el-form-item__label {
      padding: 0 !important;
    }

    .showSlide {
      animation-duration: .5s;
      /* animation-name: slideInLeft;*/
    }

    .hideSlide {
      animation-duration: .5s;
      /* animation-name: slideOutLeft;*/
    }
    .menu-top-home {
      height: 100%;
      overflow: auto;
      width: calc(100% - 65px);
    }
    .side-menu-content {
      -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
      -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
      -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
      transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
    }
    .side-menu {
      min-height: 100%;
      background-color: #324057;
      -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
      -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
      -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
      transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 100%;
      min-height: 400px;
    }
    .show-image {
      float: left;
      margin-top: 17px;
      margin-left: 4px;
      margin-right: 4px;
    }
    .head-right {
      float: right;
      height: 60px;
    }
    .menu-title {
      line-height: 60px;
      color: white;
      font-family: "Microsoft YaHei UI";
      font-size: 18px;
    }
    .menu-header {
      text-align: center;
      width: 100%;
      height: 60px;
    }
    .el-submenu .el-menu-item {
      min-width: 66px !important;
    }

    /* 图片*/
    .header_container {
      background-color: #eff2f700;
      height: 60px;
      line-height: 60px;
    }

    .el-breadcrumb {
      display: inline-block !important;
    }
    .avator {
      .wh(40px, 40px);
      border-radius: 50%;
      margin-right: 30px;
      margin-top: 10px;
      border: 1px solid #cfcfcf;
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    }
    .el-dropdown-menu {
      margin-right: 30px;
      margin-top: 0px;
    }

    .el-dropdown-menu__item {
      text-align: center;
    }
  }
</style>
