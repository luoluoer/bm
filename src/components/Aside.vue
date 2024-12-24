<template>
    <div>
        <el-menu style = "width:200px ;min-height: calc(100vh-50px);"
            router
            default-active="MaterielGoodsInfoView"
            :default-openeds	="[1]"
            class="el-menu-vertical-demo">
            
                <el-submenu index="1">
                    <template #title >系统管理</template>
                    <el-menu-item index="MaterielGoodsInfoView">物资管理</el-menu-item>

                    <el-menu-item index="/PcbBomInfo">产品管理</el-menu-item>
                </el-submenu>
                <!-- <el-menu-item index="Book">物资管理</el-menu-item> -->


                
        </el-menu>
    </div>
</template>

<style scoped>

</style>

<script>
    export default {
        name:"Aside",
        methods:{
            exit(){
                console.log("点击了exit退出方法")
                this.$router.push("/Login")
            }
        },

    }
</script>