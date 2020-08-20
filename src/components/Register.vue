<template>
  <div id="registerPage">
    <el-row>
      <el-col :span="6">登陆名:</el-col>
      <el-col :span="12">
        <el-input placeholder="请输入登陆名" v-model="registerInfo.loginName"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">密码:</el-col>
      <el-col :span="12">
        <el-input placeholder="请输入密码" v-model="registerInfo.password" show-password></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">姓名:</el-col>
      <el-col :span="12">
        <el-input v-model="registerInfo.name" placeholder="请输入姓名"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">手机号:</el-col>
      <el-col :span="12">
        <el-input placeholder="请输入手机号" v-model="registerInfo.mobile"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
          <el-button>提交注册</el-button>
      </el-col>
      <p></p>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerInfo: {
        name: "",
        password: "",
        mobile: "",
        loginName: "",
      },
    };
  },
  // mounted () {
  //   this.$axios
  //     .get('https://api.coindesk.com/v1/bpi/currentprice.json')
  //     .then(response => (console.log(response)))
  // }
};
</script>

<style>
#registerPage {
  background: url("../assets/login-picture.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}
</style>