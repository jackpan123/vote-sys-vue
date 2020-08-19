<template>
  <div id="registerPage">
      <p>
          注册页面
      </p>
      <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    }
  },
  // mounted () {
  //   this.$axios
  //     .get('https://api.coindesk.com/v1/bpi/currentprice.json')
  //     .then(response => (console.log(response)))
  // }
}
</script>

<style>
#registerPage {
background: url('../assets/login-picture.jpg');
background-size:100% 100%;
background-repeat: no-repeat;
width: 100vw;
height: 100vh;
}
</style>