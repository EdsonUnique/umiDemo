import {login,register} from '@/services/userApi'
import GlobalEnum from '@/utils/GlobalEnum';
import {Toast} from 'antd-mobile';
import router from "umi/router"

export default {

  namespace:'user',

  state:{

  },

  //异步请求
  effects:{

    *login({payload},{call,put}){

      const response=yield call(login,payload)
      if(response.data===null){
        Toast.info("用户名或密码错误")
        return;
      }

      const user=response.data;

      sessionStorage.setItem(GlobalEnum.sessionUserKey,JSON.stringify(user));

      Toast.info("登录成功")

      router.push("/")
    },

    *register({payload},{call,put}){
        //注册
        const response=yield call(register,payload.formData);
        if(response.code<=0){
          Toast.fail(response.msg);
          return;
        }

        //注册成功后跳转到登陆页面
      Toast.success(response.msg);
        router.push("/Login")

    },

  },

  reducers:{
    save(state, action) {
      return {...state,...action};
    }
  },


}
