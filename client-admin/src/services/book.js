import request from '@/utils/request';

export async function fetchBookList(params){

  return request(`/api/admin/fetchBookList?pagenum=${params.pagenum}&pagesize=${params.pagesize}`)

}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}