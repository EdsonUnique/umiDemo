import { addToShelf } from '@/services/bookApi';
import { Toast } from 'antd-mobile';


export default {

  namespace:"viewBook",

  state:{

  },

  effects:{
    *addToShelf({payload},{put,call}){

      const response=yield call(addToShelf,payload);

      Toast.info(response.msg);

    },
  },

  reducers:{

    save(state) {
      return {
        ...state
      };
    }

  },



}
