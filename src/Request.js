import config from '@/config'

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res)
        } else {
          reject(res)
        }
      }
    })
  })
}

export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}
