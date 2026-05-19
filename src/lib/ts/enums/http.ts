/* eslint-disable no-unused-vars */
export enum HttpMethod {
  DELETE = 'delete',
  GET = 'get',
  PATCH = 'patch',
  POST = 'post',
  PUT = 'put'
}

export enum HttpState {
  NONE = 'none',
  NOTIFY = 'notify',
  FORCE = 'force'
}

export enum HttpAction {
  CHANGE_PASSWORD = 'change_password',
  NONE = 'none'
}