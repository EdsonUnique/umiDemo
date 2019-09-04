import {fetchBookList,addBook,fetchTags,deleteBook} from '@/services/bookApi'
import {message} from 'antd';
import router from 'umi/router';

const BookModel = {
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

    *addBook({payload},{call,put}){

      const response=yield call(addBook,payload)

      if(response.code<=0){
        message.error(response.msg);
        return;
      }

      message.success(response.msg);

      router.push("/manageBook/viewBooks")

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


}
export default BookModel
