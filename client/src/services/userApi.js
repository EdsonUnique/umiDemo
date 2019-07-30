import {get,post} from '@/utils/request'

export function login(param) {
  return post("/user/login",{account:21,pwd:"12"})
}
