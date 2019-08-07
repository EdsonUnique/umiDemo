import request from '@/utils/request';
import { stringify } from 'qs';
import GlobalEnum from '@/utils/GlobalEnum';

export async function fetchBookList() {
  return request(GlobalEnum.location+"/book/fetchBookList")
}

export async function fetchTagList() {
  return request(GlobalEnum.location+"/book/fetchTagList")
}

export async function fetchListByTagId(param) {
  return request(GlobalEnum.location+`/book/fetchListByTagId?${stringify(param)}`)
}

export async function fetchListByNameAndAuthor(param) {
  return request(GlobalEnum.location+`/book/fetchListByNameAndAuthor?${stringify(param)}`)
}

export async function addToShelf(param) {
  return request(GlobalEnum.location+`/book/addToShelf/${param.id}`)
}

export async function fetchMyShelf() {
  return request(GlobalEnum.location+`/book/fetchMyShelf`)
}


export async function fetchBookThoughts(param) {
  return request(GlobalEnum.location+`/book/thoughts/fetchBookThoughts/${param.id}`)
}

export async function addThoughts(param) {

  return request(GlobalEnum.location+`/book/thoughts/addThoughts`,{
    method:'POST',
    body:{
      ...param,
    }

  })
}






