<template>
  <div id="userLogin">
    <van-nav-bar title="用户登陆" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <div style="margin: 16% 16px 16px 16px;">
        <van-field
          v-model="registerInfo.loginName"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
      </div>
      <div style="margin: 16px;">
        <van-field
          v-model="registerInfo.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登陆账户</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
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
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      this.axios
        .post("/authenticate", values)
        .then((response) => {
          localStorage.setItem('accessToken', 'Bearer ' + response.data.token)
          this.$router.push({ path: "/votingHall" });
        })
        .catch((error) => {
          if (error.response.status === 401) {
            Toast("账号或者密码错误")
          }
        });
    },
    onClickLeft() {
      Toast("返回主页");
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
#userLogin {
  background: url("../assets/login-picture.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}
</style>