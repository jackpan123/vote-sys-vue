<template>
<div id="loginPage">
    <div id="loginApp">
    <img src="../assets/Simbol_Konohagakure.png">
        <div>
        <p id="titleContent">
            QW投票问卷
        </p>
        </div>
        <Modal :show="modal.show" :title="modal.title" @hideModal="hideModal" @submit="submit">
            <p>{{ modal.message }}</p>
        </Modal>
        <div id="login">
            <el-row class="inputDistance">
                <el-col :span="6">
                    用户名: 
                </el-col>
                <el-col :span="12">
                    <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
                </el-col>
            </el-row>
            <el-row class="inputDistance">
                <el-col :span="6">
                    密码: 
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
                </el-col>
            </el-row>
            <el-row class="inputDistance">
                <el-col :span="12">
                    <el-button type="primary" v-on:click="login">登陆</el-button>
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
import Modal from './Modal.vue'
export default {
    name: 'login',
    data() {
        return {
            user: {
                username: '',
                password: ''
            },

            modal: {
                title: '友情提示',
                show: false,
                message: ''
            }    
        }
    },

    components: {
        Modal
    },

    methods: {
        login: function() {
            this.axios.post("http://localhost:8081/authenticate", this.user).then(
                (response) => {
                    console.log(response)
                }
            ).catch((error) => {
                if (error.response.status === 401) {
                    this.modal.message = '账号或者密码错误',
                    this.modal.show = true
                }
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
                
            })
        },

        hideModal() {
            // 取消弹窗回调
            this.modal.show = false
        },

        submit() {
            // 确认弹窗回调
            this.modal.show = false
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