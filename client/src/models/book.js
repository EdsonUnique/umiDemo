import {fetchBookList,fetchTagList,fetchListByTagId,fetchListByNameAndAuthor} from "@/services/bookApi"
import GlobalEnum from '@/utils/GlobalEnum';
import router from 'umi/router'
import { Toast } from 'antd-mobile';

export default {

  namespace:"book",

  state:{
    bookList:[],
    tagList:[],
  },

  effects:{

    *initIndexPage({payload},{call,put,all}){

      yield put({
        type:"fetchBookList"
      })

      yield put({
        type:"fetchTagList"
      })
    },

    *fetchBookList({payload},{call,put}){

      const response=yield call(fetchBookList)

      // if(response.errors.length>0){
      //   return ;
      // }

      yield put({
        type:"fetchBookListSuccess",
        payload:response.data,
      })

    },

    *fetchListByTagId({payload},{call,put}){

      const response=yield call(fetchListByTagId,payload)

      yield put({
        type:"fetchListByTagIdSuccess",
        payload:response.data,
      })

    },

    *fetchTagList({payload},{call,put}){

      const response=yield call(fetchTagList)

      // if(response.errors.length>0){
      //   return ;
      // }

      yield put({
        type:"fetchTagListSuccess",
        payload:response.data,
      })

    },

    *search({payload},{call,put}){

      const response=yield call(fetchListByNameAndAuthor,payload);

      // if(response.errors.length>0){
      //   return ;
      // }

      yield put({
        type:"fetchListByNameAndAuthorSuccess",
        payload:response.data,
      })

    },


    *goLogin({payload},{put,call}){
      // const response = yield call(goLogin);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      // router.push("/Login")
    },

  },

  reducers:{

    fetchBookListSuccess(state,{payload}){
      return {
        ...state,
        bookList:payload,
      }
    },

    fetchTagListSuccess(state,{payload}){
      return {
        ...state,
        tagList:payload,
      }
    },
    fetchListByTagIdSuccess(state,{payload}){
      return {
        ...state,
        bookList:payload,
      }
    },

    fetchListByNameAndAuthorSuccess(state,{payload}){
      return {
        ...state,
        bookList:payload,
      }
    },

    save(state){
      return {
        ...state,
      }
    },


  },

  subscriptions:{
    setup({ dispatch, history }) {
      return history.listen(({pathname,query})=>{
        if(pathname === '/ViewBook'){
          //判断登录
          if(null===sessionStorage.getItem(GlobalEnum.sessionUserKey)){

            history.location.pathname="/Login";
            history.location.query=query;
           dispatch({
             type:"goLogin",
             payload:null,
           })
          }
        }
      })
    }
  }

}
