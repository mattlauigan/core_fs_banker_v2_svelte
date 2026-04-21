import { http, type RequestConfig } from "../../utils/http"

const get = <T extends object>(
  url: string,
  config?: RequestConfig
): Promise<T> =>
  new Promise((resolve, reject) => {
    http
      .get<ResponseData<T>>(url, config)
      .then((res: AxiosResponse<ResponseData<T>>) => {
        resolve(res.data.payload)
      })
      .catch((error: ErrorResponse | null) => {
        reject(error)
      })
  })


  const utilHttp = {

  get,

}

export default utilHttp
