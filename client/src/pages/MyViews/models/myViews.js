import { Toast } from 'antd-mobile';
import {fetchMyViews,recordViews} from '@/services/userCenterApi'
import router from 'umi/router'

export default {

  namespace:'myViews',

  state:{

    myViewsList:[],

  },

  effects:{

    *recordViews({payload},{call,put}){

      const response=yield call(recordViews,payload);

      if(response.code<=0){
        //Toast.fail(response.msg);
        return;
      }

    },

    *fetchMyViews({payload},{call,put}){

      const response=yield call(fetchMyViews);

      if(response.code<=0){
        Toast.fail(response.msg);
        return;
      }

      yield put({
        type:"fetchMyViewsSuccess",
        payload:response.data,
      })

      router.push("/MyViews")


    }
  },

  reducers:{
    fetchMyViewsSuccess(state,{payload}){

      return {
        ...state,
        myViewsList: payload,
      }


    },
  },

}
