<template>
  <div id="userLogin">
    <van-nav-bar title="用户登陆" left-text="返回" left-arrow @click-left="onClickLeft" />
    <Modal :show="modal.show" :title="modal.title" @hideModal="hideModal" @submit="submit">
        <p>{{ modal.message }}</p>
    </Modal>
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
// export default {
//   data() {
//     return {
//       registerInfo: {
//         name: "",
//         password: "",
//         mobile: "",
//         loginName: "",
//       },
//     };
//   },
//   mounted () {
//     this.$axios
//       .get('https://api.coindesk.com/v1/bpi/currentprice.json')
//       .then(response => (console.log(response)))
//   }
// };
import Modal from "./Modal.vue";
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
  components: {
    Modal,
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      this.axios
        .post("http://localhost:8081/authenticate", values)
        .then((response) => {

          console.log(response);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            (this.modal.message = "账号或者密码错误"), (this.modal.show = true);
          }
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    },
    onClickLeft() {
      Toast("返回");
      this.$router.push({ path: "/" });
    },
    hideModal() {
      // 取消弹窗回调
      this.modal.show = false;
    },
    submit() {
      // 确认弹窗回调
      this.modal.show = false;
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