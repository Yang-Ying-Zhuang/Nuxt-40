// // 保持user下的数据
export const state = ()=>({
    // name: '123'
    //登录后的数据，包含token和user对象
    userInfo:{
        token: "",
        user: {}
    }
});
// 同步修改state的数据
export const mutations = {
    // 自定义一个函数，修改name的属性
    // mutations第一个参数必须是state，第二个参数是传递进来的数据
    setUserInfo(state, data) {
        // console.log(data)
        state.userInfo = data;
        // 清除用户数据
    },
    cleanUserInfo(state, info){
        if(Process.browser){
            localStorage.removeItem("userInfo");
        }
        state.userInfo ={};
    }
};

// 异步修改state的数据
export const actions = {
    login(store, data){
        // 登录接口提交, (必须要添加return)
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res=>{
            //登录成功后返回上一个页面
            this.$router.back();
            //调用user下的mutations的方法
            store.commit("setUserInfo",res.data);
            return true;
        })
    },
    // 手机发送验证码
    sendCaptcha(store, data){
        return this.$axios({
            url: "/captchas",
            method:'POST',
            data: {
                tel: data
            }
        })
    },
    // 注册请求
    register(store, data){
      return this.$axios({
        url: '/accounts/register',
        method: 'POST',
        data
   }).then(res=>{
       console.log(res)
    //登录成功后返回上一个页面
    this.$router.back();
    //调用user下的mutations的方法
    store.commit("setUserInfo",res.data);
    return true;
    })
  }
};