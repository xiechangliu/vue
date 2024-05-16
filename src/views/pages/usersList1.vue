<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账号列表</el-breadcrumb-item> 
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <div class="flex">
        <div class="input_box">
                    <el-input
                        v-model="searchParams.query"
                        placeholder="搜索关键字"
                        class="input-with-select"
                        > 
            <template #append>
                            <el-button @click="searchList"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </div>
                <el-button type="primary" @click="addUser">新建用户</el-button>
      </div>
      <!-- 表格 -->
      <!-- 
            el-table  的  data:要展示的数据数组
            el-table-column：列 prop每条数据的对应属性
              label：列标题
              scope.row:相当于一条数据
           -->
            <el-table :data="userList" style="width: 100%">
                <el-table-column prop="username" label="姓名" width="180" />
        <el-table-column prop="email" label="邮箱" width="180" />
                <el-table-column prop="mobile" label="电话" />
                <el-table-column prop="role_name" label="角色" />
                <el-table-column prop="mg_state" label="状态" > 
                  <template #default="scope">
                      <el-switch v-model="scope.row.mg_state" @change="switchChange(scope.row)" />
                  </template>
                </el-table-column>
                <el-table-column   label="操作" > 
          <template #default="scope">
            <el-button type="primary" @click="editRow(scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!-- mg_state 状态 -->
      </el-table>
      <!-- 分页 -->
             <el-pagination
                v-model:currentPage="searchParams.pagenum"
                v-model:page-size="searchParams.pagesize"
                :page-sizes="[2,5,10,20]"
                :small="small"  
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="searchList"
                @current-change="searchList"
            />
    </div>
    <!-- 新增弹窗 -->
        <el-dialog v-model="dialogFormVisible" title="新建用户">
      <!-- 
              表单
                | username | 用户名称 | 不能为空 |
                | password | 用户密码 | 不能为空 |
              | email    | 邮箱     | 可以为空 |
                | mobile   | 手机号   | 可以为空 |
             -->
           <el-form 
            ref="userForm"
            :model="formData"
            :rules="rules"
           >
               <el-form-item label="用户名称" prop="username">
                   <el-input v-model="formData.username" placeholder="请输入用户名称" />
        </el-form-item>
               <el-form-item label="用户密码" prop="password">
                   <el-input type="password" v-model="formData.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入用户邮箱" />
        </el-form-item>
               <el-form-item label="手机号" prop="mobile">
                   <el-input v-model="formData.mobile" placeholder="请输入用户手机号" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex">
          <el-button>取消</el-button>
          <el-button type="primary" @click="submitForm(userForm)" >确定</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogFormEVisible" title="编辑用户">
      <!-- 
              表单 
              | email    | 邮箱     | 可以为空 |
                | mobile   | 手机号   | 可以为空 |
             -->
           <el-form 
            ref="userForm2"
            :model="formData2"
            :rules="rules2"
           > 
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData2.email" placeholder="请输入用户邮箱" />
        </el-form-item>
               <el-form-item label="手机号" prop="mobile">
                   <el-input v-model="formData2.mobile" placeholder="请输入用户手机号" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex">
          <el-button>取消</el-button>
                   <el-button type="primary" @click="submitEForm(userForm2)" >确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { toRefs,reactive,ref } from 'vue'
import {userListApi,userAddApi,userChangeStateApi,userChangeInfoApi,userDeleteApi} from "@/util/request.js"
import axios from "axios"
export default {
  name:"roles",
  setup() {
    const data=reactive({ 
      searchParams:{
        query:"",
        pagesize:5,
        pagenum:1
      },
      total:0,
      userList:[],
      dialogFormVisible:false,
      dialogFormEVisible:false,
      formData:{
        username:"",
        password:"",
        email:"",
        mobile:"",
      },
      formData2:{ 
        id:"",
        email:"",
        mobile:"",
      },
      rules:{
        username:[
          {required:true,message:"此项为必填",trigger:"blur"}
        ],
        
        password:[
          {required:true,message:"此项为必填",trigger:"blur"}
        ],
        email:[
          {required:false,
          pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message:"请填写正确邮箱",trigger:"blur"}
        ],
        mobile:[
          {required:false,
          pattern:/^[1][3,4,5,7,8][0-9]{9}$/,
          message:"请填写正确手机号",trigger:"blur"}
        ]
      },
      rules2:{          
        email:[
          {required:false,
          pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message:"请填写正确邮箱",trigger:"blur"}
        ],
        mobile:[
          {required:false,
          pattern:/^[1][3,4,5,7,8][0-9]{9}$/,
          message:"请填写正确手机号",trigger:"blur"}
        ]
      }
    })
    const searchList=()=>{
      userListApi(data.searchParams).then(res=>{
        if(res.data){
            // 
            console.log("用户数据",res)
            data.userList=res.data.users
            data.total=res.data.total
        }
      })
      // //从第i个开始，数pagesize个，少于sum和length
      // var i = data.searchParams.pagesize * (data.searchParams.pagenum - 1)        
      // var sum = i + data.searchParams.pagesize
      // //显示的数据
      // var user = []
      // //取需要的数据
      // axios.post("/getuser", (data.searchParams)).then(res => {
      //   // userListApi(data.searchParams).then(res=>{           
      //   if (res.data) {
      //     for (; i < res.data.length && i < sum; i++) {             
      //       user.push(res.data[i])
      //     }
      //     data.userList = user;
      //     data.total = res.data.length;
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })        
    }
    const addUser=()=>{
        data.dialogFormVisible=true
    }
    // 新增提交
    const submitForm=(formEl)=>{
    // validate
      formEl.validate(res=>{
        if(!res){
          return
        }
        // 表单通过请求接口
        // axios.post('/adduser', (data.formData)).then(res => {
        userAddApi(data.formData).then(res=>{
          if(res.data){ 
            // 隐藏弹窗
            data.dialogFormVisible=false
            // 清空form
            data.formData={
              username:"",
              password:"",
              email:"",
              mobile:"",
            }
            // 重新更新列表 
            searchList()
          }
        })
      })
    }
    // 修改提交
    const submitEForm=(formEl)=>{
      formEl.validate(res=>{
        if(!res){
          return
        }
        // 提交修改
        // axios.post('/updateuser', (data.formData2)).then(res => {
        userChangeInfoApi(data.formData2).then(res=>{            
          if(res.data){ 
            data.dialogFormEVisible=false; 
            searchList()
          }
        })
      })
    }
    // 状态更改
    const switchChange=row=>{
      console.log("操作的那条数据",row)
      userChangeStateApi(row).then(res=>{
        if(res.data){ 
          searchList()
        }
      })
    }
    // 数据编辑
    const editRow=row=>{
      console.log("编辑的那条数据",row)
      const {email,mobile,id}=row
      // 展示编辑表单
      data.dialogFormEVisible=true;
      data.formData2.email=email
      data.formData2.mobile =mobile
      data.formData2.id =id
    }
    // 删除数据
    const deleteRow=row=>{
      console.log("删除的那条数据",row)
      userDeleteApi(row).then(res=>{
      // axios.post('/deleteuser', (row)).then(res => {
        searchList()
      })
    }


      // 方法初始化
      searchList()
      const userForm=ref()
      const userForm2=ref()
      return{
          ... toRefs(data),
      searchList,
      addUser,
      submitForm,
      submitEForm,
      userForm,
      userForm2,
      switchChange,
      editRow,
      deleteRow
      }
    }
  }
</script>
<style scoped>
    .input_box{
    width: 200px;
    margin-right: 15px;
  }
</style>