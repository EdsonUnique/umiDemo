import request from '@/utils/request';
import GlobalEnum from '@/utils/GlobalEnum';

export async function fetchBookList(params){

  return request(GlobalEnum.location+`/admin/book/fetchBookList?pagenum=${params.pagenum}&pagesize=${params.pagesize}`)

}

export async function addBook(params) {
  return request(GlobalEnum.location+'/admin/book/addBook', {
    method: 'POST',
    body:{
      ...params,
    },
    headers:{
      'Content-Type':'multipart/form-data',
    },
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
