
<template>
    <div style="padding:10px;">
      <!-- 搜索 -->
      <div style="margin:10px 0;">
        <el-button type = "primary" @click="add">新增</el-button>
        <el-button type = "primary">导入</el-button>
        <el-button type = "primary" @click="$router.push('/login')">导出</el-button>
      </div>
      <!-- 搜索区域 -->
      <div>
          <el-input v-model="search" placeholder="请输入搜索内容"   style="width:20%;" clearable></el-input>
          <el-button type = "primary" @click="load" style="margin-left:5px;">查询</el-button>
      </div>
  
  <!-- :row-class-name="tableRowClassName" -->
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        stripe
        >
  
  
        <el-table-column
          prop="bomid"
          label="bomid"
          width="180"
          sortable
          >
        </el-table-column>
  
        <el-table-column
          prop="bomname"
          label="bomname"
          width="180">
        </el-table-column>

        <el-table-column
          prop="quantity"
          label="quantity"
          width="180">
        </el-table-column>
  
  
        <el-table-column label="操作">
            <template #default="scope">
              <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
              <el-popconfirm title="这是一段内容确定删除吗" @confirm="handledelete(scope.row.id)">
                <el-button slot="reference" type = "danger" size="mini" >删除</el-button>
              </el-popconfirm>
              
            </template>
        </el-table-column>
      </el-table>  
      <!-- 分页 -->
      <div style=" margin:10px 0">
        
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
  
  
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
        >
          <el-form  :model="form" label-width="120px">
            <el-form-item label="bomid">
              <el-input v-model="form.bomid" style="width:80%"></el-input>
            </el-form-item>
  
            <el-form-item label="bomname">
              <el-input v-model="form.bomname" style="width:80%"></el-input>
            </el-form-item>
  
            <el-form-item label="quantity">
              <el-input v-model="form.designator" style="width:80%"></el-input>
            </el-form-item>
  
            
          </el-form>
  
  
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </span>
        </el-dialog>
  
  
  
  
  
      </div>
  
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue'
  
  //import { request } from 'http'
  
  import axios from 'axios'
  import request  from "@/utils/request";
  export default {
    name: 'HomeView',
    components: {
      //HelloWorld
    },
    data(){
  
      return {
        form:{
          
        },
        dialogVisible:false,
        pageSize:10,
        total:10, 
        currentPage:1,
        search:'',
        tableData:[],
        title:''
      }
    },
    created(){
      //请求分页查询数据
  
      fetch(
        "http://localhost:9091/MaterielGoodsSearch?pageNum=2&pageSize=3"
      ).then(res=>res.json()).then(res=>{
        console.log(res)
      })
  
      this.load()
  
    },
    
  
  
    methods:{
  
      
  
      load(){
        request.get(
          "http://localhost:9091/MaterielGoodsSearch",
            {
              params:{
                pageNum:this.currentPage,
              pageSize:this.pageSize,
              search:this.search
              }
            }).then(
              res=>{
                console.log(res)
                console.log("输出res.data.records:",res.data.records)
                this.tableData = res.data.records
                this.total = res.data.total
              }
            )
  
      },
      add(){
        this.title = "添加产品"
        this.dialogVisible= true
        this.form= {}
        
  
      },
      save(){
        
        if(this.form.id){
          
          request.put("http://localhost:9091/MaterielGoodsInfoDeal",this.form).then(res=>{
          console.log("输入res:",res)
  
          if(res.code==200){
              this.$message({
              type:"success",
              message:"更新成功"
              
            })
            this.dialogVisible = false
            this.load();//刷新表格数据
            }else {
              this.$message({
              type:"error",
              message:res.message
            })
            }
        })
        }else{
  
            request.post("http://localhost:9091/MaterielGoodsInfoDeal",this.form).then(res=>{
            console.log("输入res:",res)
            if(res.code==200){
              this.$message({
              type:"success",
              message:"添加成功"
            })
            this.dialogVisible = false
            this.load();
            
            }else {
              this.$message({
              type:"error",
              message:res.msg
            })
  
            }
          
          
        })
  
        }
  
        
  
      },
      handleEdit(row){
        this.title = "更新物资"
        this.form = JSON.parse(JSON.stringify(row))
        this.dialogVisible = true
      },
      handleSizeChange(pageSize){//改变当前每页个数触发
        this.pageSize = pageSize
        this.load()
  
      },
      handleCurrentChange(pageNum){//改变当前页码触发
        this.currentPage = pageNum
        this.load()
      },
      handledelete(id){
  
          console.log(id)
          request.delete("http://localhost:9091/MaterielGoodsInfoDeal/"+id).then(res=>{
            if (res.code== 0){
                this.$message({
                  type:"success",
                message:"删除成功"
                })
                this.load();
            }
  
          }
          
          )
      }
  
    }
  }
  </script>
  
  
  