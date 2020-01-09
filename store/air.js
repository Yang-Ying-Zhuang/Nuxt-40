// state, mutations, actions, getter
                //  箭头函数这种写法可以省略返回值return
export const state = () =>({
    //历史搜索记录
    history: [],
    allPrice: 0
});

export const mutations = {
   setHistory(state, data){
       state.history.unshift(data);
   },
   // 存储总价格
   setAllPrice(state, price){
     state.allPrice = price;
   }
}