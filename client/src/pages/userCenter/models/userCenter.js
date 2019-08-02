import { Toast } from 'antd-mobile/lib/index';
import {fetchMyShelf} from '@/services/bookApi';
import router from 'umi/router'

export default {

  namespace:"userCenter",

  state:{
    myShelf:[],
  },

  effects:{
    *fetchMyShelf({payload},{call,put}){
      const response=yield call(fetchMyShelf);

      if(response.code<=0){
        Toast.fail(response.msg);
        return;
      }

      yield put({
        type:"fetchMyShelfSuccess",
        payload:response.data,
      });

      //跳转到书架页面
      router.push("/Shelf");
    }
  },

  reducers:{
    fetchMyShelfSuccess(state,{payload}){
      return {
        ...state,
        myShelf: payload,
      }
    }
  },



}









