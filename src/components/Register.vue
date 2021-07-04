<template>
  <div id="registerPage">
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <div style="margin: 16% 16px 16px 16px;">
        <van-field
          v-model="registerInfo.loginName"
          name="loginName"
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
        <van-field
          v-model="registerInfo.name"
          name="name"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
      </div>
      <div style="margin: 16px;">
        <van-field
          v-model="registerInfo.mobile"
          name="mobile"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交注册</van-button>
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
      modal: {
        title: "友情提示",
        show: false,
        message: "",
      },
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);

      this.axios
        .get("/api/fhw/DeviceManagement/deviceBigScreen", {
          headers: {
            "Access-Token": "eyJ0b2tlbl90eXBlIjoiX2FjY2Vzc190b2tlbiIsImFsZyI6IkhTMzg0In0.eyJ1c2VyaWQiOiIxODI5NTg0MTQ5MTc0NDA2NzMxIiwidXNlcm5hbWUiOiJlZHAiLCJleHAiOjE2MTA3MDE5Mzd9.6-zsf8hYKfJjnedAsarfYrGKh7GttyWFpuAYCSlW8ue6Rjr-n0i4Z2o-yUlE2hsv",
            "Request-DateTime": "2019-08-17 06:30:52",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      this.axios
        .post("/user/v1.0/register", values)
        .then((response) => {
          if (response.data.code === 10030) {
            Toast(response.data.message);
          } else if (response.data.code === 0) {
            Toast("恭喜你，注册成功！");
          } else {
            Toast("恭喜你，注册成功！");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            Toast("请先登陆");
          }
        });
    },
    onClickLeft() {
      Toast("返回");
      this.$router.push({ path: "/" });
    },
  },
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