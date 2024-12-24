<template>
    <div style="height:50px;line-height:50px; border-bottom :1px solid #ccc ;display:flex;">
    <div style="width:200px; padding-left:30px; font-wight:bold;color:dodgerblue">后台管理</div>
    <div style="flex:1"></div>
    <div style="width:100px">
        <el-dropdown>
            <span class="el-dropdown-link">
               {{ msg }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <!-- <el-dropdown-item @click.native="$router.push('/login')">退出</el-dropdown-item> -->
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    
    </div>

    
    


    
    </div>    
</template>

<style scoped>

</style>


<script>
    export default {
        name:"Header",
        data (){
            return {
                form :{

                },
                msg : '欢迎您,'+sessionStorage.getItem("realname")
                
            }
        },
        methods : {
            logout(){
                console.log("点击了退出方法")
                sessionStorage.removeItem("userinfo")
                sessionStorage.removeItem("realname")
                this.$router.push("/")
            }
        }
        // ,
        // created(){
        //     console.log("在Header.vue执行了created方法,居然可以了")
            
        // }
    }
</script>