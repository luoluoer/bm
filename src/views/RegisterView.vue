<template>
    <div style="width:100%;height:100vh;background-color:darkslateblue;overflow:hidden">
        <div style="width:400px;margin:150px auto">
            <div style="color:#ccc;font-size: 30px;text-align: center; padding: 30px;">
                欢迎注册
            </div>

                <el-form ref = "form" :model="form" :rules="rules" size = "normal">
                    
                    <el-form-item prop = "regusername">
                        <el-input prefix-icon = "el-icon-user-solid"  v-model="form.regusername" placeholder="请输入用户名"></el-input>
                    </el-form-item>

                    <el-form-item prop = "regpassword">
                        <el-input prefix-icon = "el-icon-lock" v-model="form.regpassword"  show-password placeholder="请输入密码"></el-input>
                    </el-form-item>


                    <el-form-item prop = "confirmpassword">
                        <el-input prefix-icon = "el-icon-lock" v-model="form.confirmpassword"  show-password placeholder="请再次输入密码"></el-input>
                    </el-form-item>

                    <el-form-item prop = "realname">
                        <el-input prefix-icon = "el-icon-user-solid" v-model="form.realname" placeholder="请输入名字" ></el-input>
                    </el-form-item>


                    <el-button style="width:100%  " type="primary" @click="register">注 册</el-button>
                    <el-link href = "/login" type = "danger"> 已有账号,直接登录</el-link>
                </el-form>
        </div>
    </div>
    
</template>


<script>
//import router from "@/router";
import request  from "@/utils/request";
import axios from 'axios'

    export default {
        name:"RegisterView",
        data(){
            return {
                form : {},
                
                rules: {
                    regusername: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    regpassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    confirmpassword: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                    ],
                    realname: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ]
                }

            }

        },
        methods:{
            register(){
                console.log("username:",this.form.regusername)
                console.log("password:",this.form.regpassword)
                console.log("password:",this.form.confirmpassword)


                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        //判断两次密码是否一致,开始
                        if(this.form.regpassword!=this.form.confirmpassword){
                    this.$message({
                            type:"error",
                            message:"两次密码不一致"

                        })
                        return
                }
                //判断两次密码是否一致,结束


                    axios.post(
                    'http://localhost:9091/registeruser',
                    this.form,
                    {headers:{'Content-Type' : 'application/x-www-form-urlencoded'}}
                    ).then(res=>{
                    console.log("res:",res)
                    if (res.data.code==200){
                        console.log("开始跳转")
                        this.$message({
                            type:"success",
                            message:"注册成功"
                        })
                        console.log("尼玛,凉了")
                        this.$router.push("/login")//登录成功后进行页面跳转,跳转到主页
                        console.log("结束跳转")
                    }else{
                        this.$message({
                            type:"error",
                            message:res.data.message
                        })
                    }

                })

                    }
                    })

                console.log("这里输入提交的form:",this.form)

            }
        }

    }
</script>

<style>

</style>