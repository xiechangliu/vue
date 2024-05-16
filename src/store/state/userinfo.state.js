export default{
    //全局状态初始值
    state:{
        userInfo:(localStorage.getItem("loginData")&&JSON.parse(localStorage.getItem("loginData")))||{}
    },
    //更新state
    mutations:{
        setUserInfo(state,uInfo){
            state.userInfo=uInfo
        }
    }
}