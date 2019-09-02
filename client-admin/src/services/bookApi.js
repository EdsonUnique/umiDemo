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
  });
}

export async function fetchTags() {
  return request(GlobalEnum.location+'/admin/common/fetchTags');
}
