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
}
