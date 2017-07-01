/**
 * Created by Exotic on 2017/5/26.
 */
import axios from 'axios'
const CODE_OK = '000'

export class xhr {
  static _axios ({method = 'GET', url = '', responseType = 'application/json', requestData} = {}) {
    return axios({method, url, responseType, requestData})
      .then(response => {
        if (response.data.code !== CODE_OK) {
          alert(response.data.data)
        } else {
          return response.data.data
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  static get (url) {
    return xhr._axios({url})
  }

  static post (url, requestData) {
    return xhr._axios({method: 'POST', url, requestData})
  }

  static put (url, requestData) {
    return xhr._axios({method: 'put', url, requestData})
  }

  static delete (url, requestData) {
    return xhr._axios({method: 'delete', url, requestData})
  }

  // 并发请求
  static all (...reqs) {
    let httpsArray = []
    for (let req of reqs) {
      httpsArray.push(xhr._axios({method: req.method, url: req.url, requestData: req.requestData}))
    }
    return axios.all(httpsArray)
      .then(axios.spread((...datas) => {
        return datas
      }))
  }

}
/**
 * URL解析参数成Object
 * @example ?id=66&key=ooo
 * @return {id:66,key:ooo}
 */
export function urlParse () {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=66','&key=ooo']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
