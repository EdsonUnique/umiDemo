import moment from 'moment'
import React from 'react'
// import nzh from 'nzh/cn'
import { parse, stringify } from 'qs'
import arrayToTree from 'array-to-tree'
import { message } from 'antd'

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val
}

export function getTimeDistance(type) {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24

  if (type === 'today') {
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return [moment(now), moment(now.getTime() + (oneDay - 1000))]
  }

  if (type === 'week') {
    let day = now.getDay()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    if (day === 0) {
      day = 6
    } else {
      day -= 1
    }

    const beginTime = now.getTime() - day * oneDay

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))]
  }

  if (type === 'month') {
    const year = now.getFullYear()
    const month = now.getMonth()
    const nextDate = moment(now).add(1, 'months')
    const nextYear = nextDate.year()
    const nextMonth = nextDate.month()

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ]
  }

  const year = now.getFullYear()
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)]
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = []
  nodeList.forEach(node => {
    const item = node
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/')
    item.exact = true
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path))
    } else {
      if (item.children && item.component) {
        item.exact = false
      }
      arr.push(item)
    }
  })
  return arr
}

// export function digitUppercase(n) {
//   return nzh.toMoney(n)
// }

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!') // eslint-disable-line
  }
  const arr1 = str1.split('/')
  const arr2 = str2.split('/')
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2
  }
  return 3
}

function getRenderArr(routes) {
  let renderArr = []
  renderArr.push(routes[0])
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1)
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3)
    if (isAdd) {
      renderArr.push(routes[i])
    }
  }
  return renderArr
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  )
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''))
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes)
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1)
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    }
  })
  return renderRoutes
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1])
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query)
  if (search.length) {
    return `${path}?${search}`
  }
  return path
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export function isUrl(path) {
  return reg.test(path)
}

export function formatWan(val) {
  const v = val * 1
  if (!v || Number.isNaN(v)) return ''

  let result = val
  if (val > 10000) {
    result = Math.floor(val / 10000)
    result = (
      <span>
        {result}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    )
  }
  return result
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design'
}

export function listToTree(list, opt = {}) {
  const defaultOpt = {
    titleField: 'name',
    valueField: 'id',
    keyField: 'id',
    parentIdField: 'parentId',
    disableItemId: [],
  }

  const newOpt = {
    ...defaultOpt,
    ...opt,
  }

  if (!Array.isArray(newOpt.disableItemId)) {
    newOpt.disableItemId = [newOpt.disableItemId]
  }

  const treeFlat = list.map(i => {
    const flat = {
      ...i,
      title: i[newOpt.titleField],
      value: i[newOpt.valueField],
      key: i[newOpt.keyField],
      parentId: i[newOpt.parentIdField],
    }

    if (newOpt.disableItemId.some(j => j === i.id)) {
      flat.selectable = false
      flat.disabled = true
    }

    return flat
  })

  return arrayToTree(treeFlat, {
    parentProperty: 'parentId',
    customID: 'key',
  })
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const toUrlEncoded = obj =>
  Object.keys(obj)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join('&')

// export function convertUploadFileToFormInitialValue(uploadFileList) {
//   let list = []
//
//   if (!Array.isArray(uploadFileList)) {
//     if (uploadFileList) {
//       list.push(uploadFileList)
//     }
//   } else {
//     list = uploadFileList
//   }
//
//   return list.map(i => ({
//     uid: i.id,
//     name: i.originFileName,
//     status: 'done',
//     url: VIRTUAL_APP_NAME + i.path,
//     response: {
//       data: i,
//     },
//     uploadFileData: i,
//   }))
// }

// export function normFile(e) {
//   console.log(e)
//   if (Array.isArray(e)) {
//     return e
//   }
//   if (e && e.fileList) {
//     const newFileList = e.fileList.map(i => ({
//       ...i,
//       url:
//         i.response && i.response.data && i.response.data.path
//           ? VIRTUAL_APP_NAME + i.response.data.path
//           : null,
//       uploadFileData: i.response && i.response.data ? i.response.data : null,
//     }))
//
//     return newFileList.filter(i => i.status !== undefined)
//   }
//   return []
// }

export function beforeImageUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  const isGIF = file.type === 'image/gif'
  const isPNG = file.type === 'image/png'
  const isBMP = file.type === 'image/bmp'

  const isImage = isJPG || isBMP || isGIF || isPNG

  if (!isImage) {
    message.error('上传失败！只能上传JPG/GIF/PNG/BMP格式图片')
  }
  return isImage
}

export function beforeVideoUpload(file, filePart) {
  const isWMV = file.type === 'video/x-ms-wmv'
  const isMP4 = file.type === 'video/mp4'
  const isAVI = file.type === 'video/avi'
  const isMOV = file.type === 'video/quicktime'
  const isRMVB = file.type === 'audio/x-pn-realaudio'
  /* const isMkv = file.type === 'video/x-matroska'
   const isFLV = file.type === 'video/x-flv'*/
  const is3GP = file.type === 'video/3gpp'

  const isVideo = isWMV || isMP4 || isAVI || isMOV || isRMVB || is3GP

  if (!isVideo) {
    message.error('上传失败！只能上传avi/mov/rmvb/mp4/3gp/wmv格式视屏')
  }
  return isVideo
}

export function beforeTextUpload(file) {
  const isPPt = file.type === 'application/vnd.ms-powerpoint'
  const isPPtx =
    file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  const isWps = file.type === 'application/vnd.ms-works'
  const isPPts = isPPtx || isPPt || isWps

  if (!isPPts) {
    message.error('上传失败！只能上传pptx/ppt/wps格式文件')
  }
  return isPPts
}
