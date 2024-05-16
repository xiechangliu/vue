<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item> 
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
            </div>
            <!-- 表格 -->
            <!-- 
              el-table  的  data:要展示的数据数组
              el-table-column：列 prop每条数据的对应属性
                label：列标题
                scope.row:相当于一条数据
             -->
            <el-table :data="goodsList" style="width: 100%">
                <el-table-column prop="goods_name" label="商品名" width="180" />
                <el-table-column prop="goods_price" label="价格（￥）" width="180" />
                <el-table-column prop="goods_weight" label="商品重量（kg）" /> 
                <el-table-column prop="goods_state" label="商品状态" > 
                    <template #default="scope"> 
                        <p>{{switchState(scope.row.goods_state)}}</p>
                    </template>
                </el-table-column>  
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
    </div>
</template>
<script>
import { toRefs,reactive,ref } from 'vue'
import {goodsListApi} from "@/util/request.js"
export default {
    name:"goods",
    setup() {
        const data=reactive({ 
            searchParams:{
                query:"",
                pagesize:5,
                pagenum:1
            },
            total:0,
            goodsList:[], 
        })
        const searchList=()=>{
            goodsListApi(data.searchParams).then(res=>{
                if(res.data){
                    // 
                    console.log("用户数据",res)
                    data.goodsList=res.data.goods
                    data.total=res.data.total
                }
            })
        }
     
        const switchState=state=>{
            switch (state) {
                case 0:
                    return "未通过"
                    break; 
                case 1:
                    return "审核中"
                    
                    break; 
                case 2:
                    return "已审核"
                    
                    break; 
            }
        }
        // 方法初始化
        searchList() 
        return{
            ... toRefs(data),
            searchList, 
            switchState
        }
    }
}
</script>