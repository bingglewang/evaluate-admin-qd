<template>
  <div id="app" class="fillcontain">
    <router-view/>
  </div>
</template>

<script>
  import 'animate.css'

  export default {
    //监听页面路径
    watch:{
      $route(now,old){
        console.log("当前路径："+now.path);
        console.log("之前路径："+old.path);
      }
    }
  }
</script>

<style lang="less">
  @import './assets/style/common';
</style>
