import { Toast } from 'antd-mobile';
import {addThoughts,fetchBookThoughts} from '@/services/bookApi';
import router from 'umi/router'

export default {

  namespace:"readingThoughts",

  state:{
    bookReadingThoughtsList:[],
    myAllThoughtsList:[],
  },

  effects:{

    *addThoughts({payload},{call,put}){

      const response=yield call(addThoughts,payload);

      if(response.code<=0){
        Toast.fail(response.msg);
        return;
      }

      Toast.success(response.msg);
    },

    *fetchBookThoughts({payload},{call,put}){
      const response=yield call(fetchBookThoughts,payload);

      if(response.code<=0){
        Toast.fail(response.msg);
        return;
      }

      yield put({
        type:'fetchBookThoughtsSuccess',
        payload:response.data,
      });

      router.push({
        pathname:"/ReadingThoughts",
        query:{
          payload:payload.item,
        }
      })
    }

  },

  reducers:{

    fetchBookThoughtsSuccess(state,{payload}){
      return {
        ...state,
        bookReadingThoughtsList:payload,
      }
    }
  },

}
