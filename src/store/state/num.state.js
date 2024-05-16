export default{
    namespaced:true,
    // 全局的状态初始值
    state: {
        count:1, 
    },
    // 计算state,获取对应的值（计算属性）
    getters: {
        countStatus(state){
        return state.count<=1
        }
    },
    // 更新状态的方法-更新state的唯一方法（上面state返回的对象，num传过来的参数）
    //vue中commit mutations触发
    mutations: {
        setCount(state,num){
            state.count=num
        }
    },
    // 可以异步操作,可以返回promise,更改数据还是传递到mutations去更改，context==store
    //dispatch派发
    actions: {
        setCountPromise(context,num){
        return new Promise((resolve,reject)=>{
            if(num>100){
            reject("值不能大于100")
            }else{
            context.commit("setCount",num)
            resolve()
            }
        })
        }
  },
}