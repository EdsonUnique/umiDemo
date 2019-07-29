import {get,post} from '@/utils/request'

export function fetchBookList() {
  return get("/book/fetchBookList")
}

export function fetchTagList() {
  return get("/book/fetchTagList")
}

export function fetchListByTagId(param) {
  return get("/book/fetchListByTagId?id="+param.id)
}

export function fetchListByNameAndAuthor(param) {
  return get("/book/fetchListByNameAndAuthor?queryString="+param)
}






