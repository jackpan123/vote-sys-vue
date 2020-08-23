<template>
  <div id="indexPage">
    <div id="loginApp">
      <img src="../assets/Simbol_Konohagakure.png" />
      <div style="margin: 16px">
        <p id="titleContent">QW投票问卷</p>
      </div>
      <div style="margin: 16px;">
        <van-row type="flex" justify="center">
          <van-col span="8">
            <van-button type="primary" to="/login">账户登陆</van-button>
          </van-col>
          <van-col span="8">
            <van-button type="primary" to="/register">用户注册</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
#loginApp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: green;
}

#titleContent {
  font-size: 30px;
}

#indexPage {
  background: url("../assets/login-picture.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}

/* .inputDistance {
    border: 10px;
} */
</style>