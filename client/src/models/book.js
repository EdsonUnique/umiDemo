import {fetchBookList,fetchTagList,fetchListByTagId,fetchListByNameAndAuthor} from "@/services/bookApi"
import GlobalEnum from '@/utils/GlobalEnum';
import router from 'umi/router'
import { routerRedux } from 'dva/router';

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

      const response=yield call(()=>fetchListByTagId(payload))

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

      const response=yield call(()=>fetchListByNameAndAuthor(payload.value));

      // if(response.errors.length>0){
      //   return ;
      // }

      yield put({
        type:"fetchListByNameAndAuthorSuccess",
        payload:response.data,
      })

    },

    *goLogin({payload},{put,call}){

    },

  },

  reducers:{

    fetchBookListSuccess(state,{payload}){
      return {
        ...state,
        bookList:payload.data,
      }
    },

    fetchTagListSuccess(state,{payload}){
      return {
        ...state,
        tagList:payload.data,
      }
    },
    fetchListByTagIdSuccess(state,{payload}){
      return {
        ...state,
        bookList:payload.data,
      }
    },

    fetchListByNameAndAuthorSuccess(state,{payload}){
      return {
        ...state,
        bookList:payload.data,
      }
    }


  },

  subscriptions:{
    setup({ dispatch, history }) {
      history.listen(({pathname,query})=>{
        if(pathname.includes('/ViewBook')){
          //判断登录
          if(null===sessionStorage.getItem(GlobalEnum.sessionUserKey)){

           history.location.pathname="/Login"
            // history.go("/Login")
            // router.push("/Login")
          }
        }
      })
    }
  }

}
