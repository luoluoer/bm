<template>
    <div style="width:100%;height:100vh;background-color:darkslateblue;overflow:hidden">
        <div style="width:400px;margin:150px auto">
            <div style="color:#ccc;font-size: 30px;text-align: center; padding: 30px;">
                欢迎登录
            </div>

                <el-form ref = "form" :model="form" size = "normal" :rules="rules" > 
                    <el-form-item prop = "username">
                        <el-input prefix-icon = "el-icon-user-solid"  v-model="form.username"  ></el-input>
                    </el-form-item>

                    <el-form-item prop = "password">
                        <el-input prefix-icon = "el-icon-lock" v-model="form.password"  show-password ></el-input>
                    </el-form-item>

                    <el-button style="width:100%  " type="primary" @click="login">登 录</el-button>
                    
                    <el-link type = "warning" href="/Register">没有账号?注册</el-link>
                </el-form>
        </div>

        <div div style="color:#ccc;font-size: 30px;text-align: right ; padding: 30px;">
        <el-link  href="https://beian.miit.gov.cn/" target="_blank" style="color:#000;font-size: 30px;" >鲁ICP备2021012722号-1</el-link>
    </div>
    </div>

</template>


<script>
//import router from "@/router";
import request  from "@/utils/request";

    export default {
        name:"LoginView",
        data(){
            return {
                form : {},
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                }
            }


        },
        beforeMount(){
            console.log("进入到了LoginView的login方法")
            let userinfo = sessionStorage.getItem("userinfo")
            if (userinfo){
                this.$router.push("/MaterielGoodsInfoView")//有缓存信息,跳转到主页
            }

        },
        methods:{
            login(){
                console.log("username:",this.form.username)
                console.log("password:",this.form.password)
                console.log("这里输入提交的form:",this.form)

                this.$refs['form'].validate((valid) => {
                    if (valid) {
                request.post('http://localhost:9091/userlogin',
                this.form
                ).then(res=>{
                    console.log("res:",res)
                    sessionStorage.setItem("userinfo",JSON.stringify(res.data));
                    sessionStorage.setItem("realname",res.data.realname);
                    console.log("开始将data数据存入缓存结束");
                    if (res.code==200){
                        console.log("开始跳转")
                        this.$message({
                            type:"success",
                            message:"登录成功"

                        })
                        console.log("开始跳转")
                        this.$router.push("/MaterielGoodsInfoView")//登录成功后进行页面跳转,跳转到主页
                        console.log("结束跳转")
                    }else{
                        this.$message({
                            type:"error",
                            message:res.message
                        })
                    }

                })
                    }
                }                              )



            }
        }

    }
</script>

<style>

</style>