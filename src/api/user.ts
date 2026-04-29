// import { UserUrl } from 'routes/url/access'
// import { OptionProps } from 'ts/types/component'
// import { User } from 'ts/types/data/user'
// import { SelectOption } from 'ts/types/prop'
// import { utilHttp } from 'utils'

// const getBranchParam = (): Promise<OptionProps<SelectOption>[]> =>
//   utilHttp.select<SelectOption>(UserUrl.param_pmo)

// const getRoleParam = (): Promise<OptionProps<SelectOption>[]> =>
//   utilHttp.select<SelectOption>(UserUrl.param_role)

// const showPosUserData = (id: string | undefined): Promise<User> =>
//   utilHttp.get<User>(`${UserUrl.pos}/${id}`)

// const showSystemUserData = (id: string | undefined): Promise<User> =>
//   utilHttp.get<User>(`${UserUrl.portal}/${id}`)

// const updateSystemUserData = (id: string | undefined): Promise<User> =>
//   utilHttp.get<User>(`${UserUrl.portal}/${id}`)

const getUserStatus = (): Promise<string> => {
  return Promise.resolve("online");
};

const user = {
  getUserStatus
  // getBranchParam,
  // getRoleParam,
  // showPosUserData,
  // showSystemUserData,
  // updateSystemUserData
};

export default user;
