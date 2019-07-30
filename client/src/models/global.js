//数据模型
export default{

  state:{},

  reducers:{

    save(state,action){
      return {...state,...action}
    }

  },

  subscriptions:{
    setup({dispatch,history}){

      history.listen((pathname,query)=>{

      })
    }
  }


}
