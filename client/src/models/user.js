import {fetchBookList} from '@/services/bookApi'

export default {

  namespace:'user',

  state:{
    info:[]
  },

  //异步请求
  effects:{

    *login({payload},{call,put}){

      const response=yield call(fetchBookList)
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
