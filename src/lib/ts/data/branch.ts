import type { Branch as BaseBranch } from './base'

export type Branch = BaseBranch & {
  address: string
  type: string
  headoffice: string
  detail: BranchDetail | null
  fin: BranchFin
}

export type BranchDetail = {
  manned_flag: boolean
}

export type BranchFin = {
  bir_accr_code: string
  bir_accr_name: string
  bir_accr_addr: string
  bir_reg_tin: string
}

export type BranchData = {
  id: number
  area_id: number
  code: string
  name: string
  address: string
}
