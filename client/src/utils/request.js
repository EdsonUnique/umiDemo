import axios from 'axios'

const instance=axios.create({
  headers:{
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    },//设置跨域请求头
  baseURL:"http://localhost:10008/api"
})

export function get(url) {
  return instance.get(url);
}




