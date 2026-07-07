/* eslint-disable no-unused-vars */
export enum AuthPath {
  base = '/auth',  

  changepassword = `${AuthPath.base}/changepassword`,
  login = `${AuthPath.base}/login`,
  logout = `${AuthPath.base}/logout`,
  register = `${AuthPath.base}/register`,
  refresh = `${AuthPath.base}/refresh`
}
