import {login} from '@/services/userApi'

export default {

  namespace:'user',

  state:{
    userInfo:{},
  },

  //异步请求
  effects:{

    *login({payload},{call,put}){

      const response=yield call(login(payload))
      console.log(response.data)

      yield put({
        type:"save",
        payload:{
          info:response.data,
        }
      })
    },

    *register({payload},{call,put}){

    },

  },

  reducers:{
    save(state, action) {
      return {...state,...action};
    }
  },


}
