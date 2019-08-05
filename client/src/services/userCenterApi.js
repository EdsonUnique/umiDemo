import request from '@/utils/request';
import GlobalEnum from '@/utils/GlobalEnum';

export async function fetchMyViews() {
  return request(GlobalEnum.location+"/book/fetchMyViews")
}

export async function recordViews(params) {
  return request(GlobalEnum.location+"/userCenter/recordViews/"+params.id)
}
