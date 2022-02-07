<template>
    <div class="register">
        <el-card>
            <h1 class="header">Register </h1>
            <el-form
                class="register-form"
                :model="user"
                :rules="rules"
                ref="form"
                @submit.prevent="register"
            >
            

            <el-form-item prop="username">
                <el-input v-model="user.username" placeholder="Username" type="text" prefix-icon="fas fa-user"></el-input>
            </el-form-item>

            <el-form-item prop="email">
                <el-input v-model="user.email" placeholder="Email" type="email" prefix-icon="fas fa-at"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input
                v-model="user.password"
                placeholder="Password"
                type="password"
                prefix-icon="fas fa-lock"
                ></el-input>
            </el-form-item>

            <el-form-item prop="password_verification">
                <el-input
                v-model="user.password_verification"
                placeholder="Password"
                type="password"
                prefix-icon="fas fa-lock"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button
                :loading="loading"
                class="register-button"
                type="primary"
                native-type="submit"
                block
                >Register</el-button>
            </el-form-item>
            <router-link class="login" to="/Login">Already Registered?</router-link>

            </el-form>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Register',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input a password'));
            } else {
                if (this.user.password_verification !== '') {
                    this.$refs.form.validateField('password_verification');
                }
                callback();
            }
        };
        return {
            user:{
                username:'',
                email:'',
                password:'',
                password_verification:''
            },
            loading: false,
            rules: {
                username: [
                    {
                        required: true,
                        message: "Username is required",
                        trigger: "blur"
                    },
                    {
                        min: 4,
                        message: "Username length should be at least 5 characters",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "Password is required", trigger: "blur" },
                    {
                        min: 5,
                        message: "Password length should be at least 5 characters",
                        trigger: "blur"
                    },
                    { 
                        validator: validatePass, 
                        trigger: 'blur' 
                    }
                ],
                email: [
                    {
                        type: 'string',
                        required: true,
                        message: 'Please enter email address',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: 'Please enter the correct email address',
                        trigger: ['blur', 'change']
                    }
                ]
            }
        }
    },
    mounted() {
        document.title = "ECOM | Register"
    },
    methods:{
        async register(){
            let valid = await this.$refs.form.validate();
            if (!valid) {
                return;
            }
            await axios.post("/api/users/", {
                username: this.user.username,
                password: this.user.password,
                email: this.user.email,
            }).then(response=>{
                this.$message({message:`Successfully Registered`, type:'success'});
                this.$router.push('/Login')
            })

        }
    }
}
</script>

<style scoped>
.register {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-button {
  width: 100%;
  margin-top: 40px;
}
.register-form {
  width: 290px;
}

</style>
<style lang="scss">
@import "../../node_modules/bulma";
</style>