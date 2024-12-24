<template>
    <div>
        


        <!-- 头部 -->
        <Header />
        <div style="display:flex">
        <!-- 侧边栏 -->
            <Aside />
            <router-view  style="flex:1px"/>
    <!-- 内容区域 --> 
        </div>
        
    </div>
</template>


<script>
    import  Aside from '@/components/Aside.vue';
    import  Header  from  '@/components/Header.vue'
    export default{
        name:'Layout',
        components:{
            Aside,
            Header
        }
        

        
    }

</script>