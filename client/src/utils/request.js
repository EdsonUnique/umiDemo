import axios from 'axios'

const instance=axios.create({
  headers:{
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    },//设置跨域请求头
  baseURL:"http://localhost:10008/api"
})

export function get(url) {
  return instance.get(url);
}

export function post(url,param) {

  let urlParams=new URLSearchParams();
  let json=JSON.stringify(param)
  urlParams.append("json",json);
    console.log(json)
  console.log(urlParams)


  return instance.post(url,urlParams);
}




