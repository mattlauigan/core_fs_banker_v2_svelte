import type { Branch } from './base'
import type { Role } from './user'

export type Access = {
  name: string
  username: string
  branch: Branch
  role: Role
  modules: number[]
  bitmap: string
  // userleveldesc: string
  // termcode: string
  // termdesc: string
  // role: string
  // fullname?: string
  // userid?: number
  // userleveldesc?: string
  // userbranch?: string
  // branchname?: string
  // termcode?: string
  // termdesc?: string
  // role?: string
}

export type ChangePassword = {
  proccode: string
  chnltype: string
  dttm: string
  traceno: string
  refno: string
}

export type Login = {
  access_token: string
  token?: string
}
