<template>
    <div class="login">
        <el-card>
            <h1 class="header">Login </h1>
            <el-form
                class="login-form"
                :model="user"
                ref="form"
                @submit.prevent="login"
            >
            
            <el-form-item prop="username">
                <el-input v-model="user.username" placeholder="username" type="text" prefix-icon="fas fa-user"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input
                v-model="user.password"
                placeholder="Password"
                type="password"
                prefix-icon="fas fa-lock"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button
                :loading="loading"
                class="login-button"
                type="primary"
                native-type="submit"
                block
                >Login</el-button>
            </el-form-item>
            <router-link class="login" to="/Register">Doesn't Registered yet?</router-link>

            </el-form>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
    name: 'Login',
    data() {

        return {
            user:{
                username:'',
                password:''
            },
            loading: false
        }
    },
    mounted() {
        document.title = "ECOM | Login"
    },
    methods:{
        async login(){
            axios.defaults.headers.common["Authorization"] = "";
            localStorage.removeItem("token")

            let valid = await this.$refs.form.validate();
            if (!valid) {
                return;
            }
            await axios.post("/api/token/login/", {
                password: this.user.password,
                username: this.user.username,
            }).then(response=>{
                const token = response.data.auth_token;
                this.$store.commit('setToken', token)
                axios.defaults.headers.common["Authorization"] = "Token " + token;
                this.$router.push('/')
                this.$message({message:`Successfully Logined`, type:'success'});
            }).catch(error=>{
                console.log(error.response)
                if(error.response){
                    _.each(error.response.data, propX=>{
                        this.$message({message:propX[0], type:'warning'});
                    })  
                }
                else{
                    this.$message({message:'Something went wrong. Pls Try Again', type:'warning'});
                }
            })

        }
    }
}
</script>

<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}

</style>
<style lang="scss">
@import "../../node_modules/bulma";
</style>