<template>
    <div>
         <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item> 
        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">
            <el-button type="primary" @click="dialogFormVisible=true">新建角色</el-button>
            <el-table :data="rolesList" style="width: 100%">
                <el-table-column prop="roleName" label="角色名"  />
                <el-table-column prop="roleDesc" label="角色描述"  />
                <el-table-column>
                    <template #default="scope">
                        <el-button type="primary" @click="editRow(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新建编辑弹窗表单 -->
         <el-dialog v-model="dialogFormVisible" 
         @close="clearForm"
         :title="formData.id?'编辑角色':'新建角色'">
            <!-- 
                表单 
              只有编辑保存的时候有 | :id      | 角色 ID  | 不能为空`携带在url中` |
                | roleName | 角色名称 | 不能为空              |
                | roleDesc | 角色描述 | 可以为空              |
             -->
           <el-form 
            ref="userForm"
            :model="formData"
            :rules="rules"
           > 
               <el-form-item label="角色名称" prop="roleName">
                   <el-input v-model="formData.roleName" placeholder="请输入角色名称" />
               </el-form-item>
               <el-form-item label="角色描述" prop="roleDesc">
                   <el-input v-model="formData.roleDesc" placeholder="请输入角色描述" />
               </el-form-item>
           </el-form>
           <template #footer>
               <div class="flex">
                   <el-button>取消</el-button>
                   <el-button type="primary" @click="submitForm(userForm)" >确定</el-button>
               </div>
           </template>
        </el-dialog>
    </div>
</template>
<script>
import {reactive,toRefs,ref} from "vue"
import {getRolesApi,addRolesApi,editRolesApi,rolesDeleteApi} from "@/util/request.js"
export default {
    name:"roles",
    setup(){
        const data=reactive({
            rolesList:[],
            dialogFormVisible:false,
            formData:{
                roleName:"",
                roleDesc:""
            },
            rules:{
                roleName:{
                    required:true,message:"此项必填",trigger:"blur"
                }
            }, 
        })
        const getList=()=>{
            getRolesApi().then(res=>{
                data.rolesList=res.data
            })
        }
        const submitForm=formEl=>{
            formEl.validate(res=>{
                if(!res){
                    return
                }
                // 提交表单
                if(data.formData.id){
                editRolesApi(data.formData).then(res=>{
                    if(res.data){
                        data.dialogFormVisible=false
                        getList()
                    }
                })

                }else{
                addRolesApi(data.formData).then(res=>{
                    if(res.data){
                        data.dialogFormVisible=false
                        getList()
                    }
                })

                }
            })
        }
        const editRow =row=>{
            data.dialogFormVisible=true 
            const {roleName,roleDesc,id} =row
            data.formData={
                id,
                roleName,
                roleDesc
            } 
        }
        const deleteRow =row=>{
            rolesDeleteApi(row).then(res=>{
                getList()
            })
        }
        // 清楚表单
        const clearForm=()=>{
            data.formData={
                roleName:"",
                roleDesc:""
            } 
            }
        getList()
        const userForm=ref()
        return{
            ...toRefs(data),
            editRow,
            deleteRow,
            userForm,
            submitForm,
            clearForm
        }
    }
}
</script>