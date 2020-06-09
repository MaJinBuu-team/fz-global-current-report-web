import request from '@/modules/core/request'

export function getParkingDetails(data) {
  return request({
    url: '/api/parking/getParkingDetails',
    method: 'post',
    data
  })
}

export function getParkingTotal(data) {
  return request({
    url: '/api/parking/getParkingTotal',
    method: 'post',
    data
  })
}







