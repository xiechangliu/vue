<template>
  <div>
    <h2>vue3的生命周期</h2>
    <div id="dom">{{msg}}--{{num}}</div>
    <!-- v-on:事件名="事件方法" 绑定事件 简写@:事件名="事件方法" -->
    <!-- 事件及方法直接声明在 setup内-->
    <button v-on:click="handleClick">click me</button>
    <hr>
    <!-- v-model 双向绑定 -->
    <!-- input：输入事件 
        blur:失去焦点
        focus:获取焦点
        change：内容更改
    -->
    <input type="text" placeholder="请输入姓名" v-model="userName"><br/>
    <input type="text" placeholder="请输入电话" v-model="userPhone"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @change="handleChange"
    ><br/>
    <textarea placeholder="请输入您的建议" cols="30" rows="10" v-model="userInput"></textarea>
    <p>{{userName}}---{{userInput}}</p>
    <button @click="submit">提交</button>

  </div>
</template>
<script>
import { reactive, toRefs,onBeforeMount,onMounted,onBeforeUpdate,onUpdated } from "vue"
export default {
  name:"about",
  setup() {
    const data =reactive({
      msg:"你好！",
      msg2:"hello world",
      num:0,
      userName:"",
      userInput:"",
      userPhone:"",
    })
    // 数据渲染前
    onBeforeMount(()=>{
      console.log("onBeforeMount",document.querySelector("#dom"))
    })
    // 数据渲染后
    onMounted(()=>{
      console.log("onMounted",document.querySelector("#dom")) 
      setTimeout(()=>{
        data.msg="hello"
        // data.msg2="hello"
      },2000)
    })
    // dom更新前
    onBeforeUpdate(()=>{ 
      console.log("onBeforeUpdate")
    })
    // dom更新前
    onUpdated(()=>{ 
      console.log("onUpdated")
      // data.num+=1;//出发死循环
    })
    // 事件及方法
    const handleClick=()=>{
      alert("你好")
    }
    const submit=()=>{
      alert(`${data.userName}的建议是${data.userInput}`)
    }
    const handleFocus=()=>{
      console.log("获取焦点了")
    }
    const handleBlur=()=>{
      return
      console.log("失去焦点")
      if(!data.userPhone){
        alert("手机号必填")
      }
    }
    const handleInput=()=>{
      //  正则验证手机号
      return 
      if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(data.userPhone)){ 
      console.log("不符合手机号")
      }else{
          console.log("符合手机号")
      }
      
    }
    const handleChange=()=>{
      //  正则验证手机号
      if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(data.userPhone)){ 
      console.log("不符合手机号")
      }else{
          console.log("符合手机号")
      }
      
    }
    

    return{
      ...toRefs(data),
      handleClick,
      submit,
      handleFocus,
      handleBlur,
      handleInput,
      handleChange
    }
  }
}
</script>
