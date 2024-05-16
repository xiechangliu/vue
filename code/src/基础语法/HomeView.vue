<template>
<div>
  <h1>hello world!</h1>
   <p v-text="name"></p>
   <!-- v-text的简写 -->
   <p>{{name}}</p>
    <!-- v-html -->
    <p>{{info}}</p>
    <p v-html="info"></p>
    <!-- v-bind:属性名="变量名"绑定动态的标签属性   简写：  :属性名="变量名"--> 
    <p v-bind:data="dataVal">我有属性data</p>
    <!-- class类名绑定  可以叠加使用 -->
    <p class="text" :class="{'red':!isRed}">我是红色的</p>
    <!-- 判断语句  v-if   false的时候 是元素未渲染在页面-->
    <!-- v-show :false的时候 是样式上的隐藏 -->
    <p v-if="!isTrue">我是if存在</p>
    <p v-show="!isTrue">我是show展示</p>

    <p v-if="isFalse">if</p>
    <p v-else>else</p> 
    <!-- for循环 -->
    <ul>
      <!-- 循环此数组userList  -->
      <!-- v-for="(每一个对象的变量,下标) in 数组"  -->
      <li v-for="(item,index) in userList" :key="index">
        学生姓名：{{item.username}}
        学生年龄：{{item.userage}}
      </li>
      
    </ul>

</div>
   


</template>

<script>
  import {reactive,toRefs} from "vue"
  export default{
    name:"home",
    setup() {
      // beforeCreate和created 两个生命周期
      const data = reactive({
        name:"小红",
        age:20,
        info:"<i>我是斜体字</i>",
        dataVal:20,
        isRed:true,
        isTrue:true,
        isFalse:false, 
        userList:[
          {
            username:"小红",
            userage:10
          },
          
          {
            username:"小明",
            userage:12
          },
          {
            username:"小李",
            userage:13
          },
          {
            username:"小蓝",
            userage:14
          },
          {
            username:"杰克",
            userage:11
          }

        ]

      })

      return{
        ...toRefs(data)
      }
    }

  }
</script>
<style >
  .red{
    color: red;
  }
</style>
