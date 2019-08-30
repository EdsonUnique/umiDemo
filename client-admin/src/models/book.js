import { fetchBookList } from '@/services/bookApi';
import { message } from 'antd';

const BookModel = {
  namespace: 'book',
  state: {
    bookList: [],
  },

  effects: {
    *fetchBookList({ payload }, { call, put }) {
      const response = yield call(fetchBookList, payload);
    *fetchBookList({ payload }, { call, put }) {
      const response = yield call(fetchBookList, payload);

      if (response.code <= 0) {
        message.error(response.msg);
        return;
      }

      yield put({
        type: 'fetchBookListSuccess',
        payload: response.data,
      });
    },
  },

  reducers: {
    fetchBookListSuccess(state, { payload }) {
      return {
        ...state,
        bookList: payload,
      };
    },
  },
};
export default BookModel;
