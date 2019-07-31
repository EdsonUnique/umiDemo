import request from '@/utils/request';
import { stringify } from 'qs';
import GlobalEnum from '@/utils/GlobalEnum';

export async function login(params) {
  return request(GlobalEnum.location+"/user/login",{
    method:'POST',
    body:{
      ...params
    }

  })
}
