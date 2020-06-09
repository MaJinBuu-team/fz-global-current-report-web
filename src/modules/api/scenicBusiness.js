import request from '@/modules/core/request'

export function scenicBusinessDetail(data) {
  return request({
    url: '/api/scenic/scenicBusinessDetail',
    method: 'post',
    data
  })
}

export function scenicBusinessTotal(data) {
  return request({
    url: '/api/scenic/scenicBusinessTotal',
    method: 'post',
    data
  })
}



