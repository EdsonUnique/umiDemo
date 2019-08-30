import {fetchBookList,addBook} from '@/services/bookApi'
import {message} from 'antd'

const BookModel = {
  namespace: 'book',
  state: {
    bookList: [],
    pageInfo:{},
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

    }

  },

  reducers: {

    fetchBookListSuccess(state, {payload}) {
      return {
        ...state,
        bookList: payload.list,
        pageInfo:payload,
      };
    }

  },


}
export default BookModel
