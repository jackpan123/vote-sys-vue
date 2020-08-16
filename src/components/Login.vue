<template>
<div id="loginPage">
    <div id="loginApp">
    <img src="../assets/Simbol_Konohagakure.png">
      <div>
        <p id="titleContent">
          QW投票问卷
        </p>
      </div>
    <div id="login">
        <el-row class="inputDistance">
            <el-col :span="6">
                用户名: 
            </el-col>
            <el-col :span="12">
               <el-input v-model="username" placeholder="请输入用户名"></el-input>
            </el-col>
        </el-row>
        <el-row class="inputDistance">
            <el-col :span="6">
                密码: 
            </el-col>
            <el-col :span="12">
               <el-input placeholder="请输入密码" v-model="userpassword" show-password></el-input>
            </el-col>
            
        </el-row>
        <el-row class="inputDistance">
            <el-col :span="12">
                <el-button type="primary">登陆</el-button>
            </el-col>
            <el-col :span="12">
                <router-link to="/register"><el-button>注册</el-button></router-link>
            </el-col>
            <p></p>
        </el-row>
        
    </div>
  </div>
  </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            userpassword: ''
        }
    }
}
</script>
<style scoped>
#loginApp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: green;
  
}

#titleContent {
    font-size: 30px;
}

#loginPage {
background: url('../assets/login-picture.jpg');
background-size:100% 100%;
background-repeat: no-repeat;
width: 100vw;
height: 100vh;
}

/* .inputDistance {
    border: 10px;
} */
</style>