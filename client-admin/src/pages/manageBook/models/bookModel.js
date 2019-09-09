import {fetchBookList,addBook,fetchTags,deleteBook} from '@/services/bookApi'
import {message} from 'antd';
import router from 'umi/router';
import GlobalEnum from "../../../utils/GlobalEnum";

const initPage = (dispatch, { pathname, query, state }) => {
  switch (pathname) {
    case '/manageBook/viewBooks':
      dispatch({
        type: 'fetchBookList',
        // 是否恢复页面状态
        payload: {
          pagenum:0,
          pagesize:GlobalEnum.pagesize,
        },
      });
      break;
    default:
      break
  }
};

export default{
  namespace: 'book',
  state: {
    bookList: [],
    pageInfo:{},
    tags:[],
  },

  effects: {

    *fetchBookList({payload},{call,put}){
      const response=yield call(fetchBookList,payload)

      if(response.code<=0){
        message.error(response.msg);
        return;
      }

      yield put({
        type:'fetchBookListSuccess',
        payload:response.data,
      })

    },

    *addBook({payload},{call,put,all}){

      const response=yield call(addBook,payload)


      if(response.code<=0){
        message.error(response.msg);
        return;
      }

      message.success(response.msg);

    },

    *fetchTags({payload},{call,put}){
      const response=yield call(fetchTags)

      if(response.code<=0){
        message.error("加载失败");
        return;
      }

      yield put({
        type:'fetchTagsSuccess',
         payload:response.data,
      })

    },

    *deleteBook({payload},{call,put}){
      const response=yield call(deleteBook,payload)

      if(response.code<=0){
        message.error(response.msg);
        return;
      }

      message.success(response.msg);


    }

  },

  reducers: {

    fetchBookListSuccess(state, {payload}) {
      return {
        ...state,
        bookList: payload.list,
        pageInfo:payload,
      };
    },

    fetchTagsSuccess(state,{payload}){
       return {
          ...state,
          tags:payload,
        };
    }

  },

    subscriptions: {
      /**
       * 初始化数据
       * @param dispatch
       * @param history
       * @returns {*}
       */
      setup({ dispatch, history }) {
        return history.listen(location => {
          initPage(dispatch, location)
        })
      },
    },


}
