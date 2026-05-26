/* eslint-disable no-unused-vars */
export enum ModalTypeEnum {
  CONFIRM = "confirm",
  DELETE = "delete",
  ERROR = "error",
  INFO = "info",
  NOTIF = "notif",
  PROCEED = "proceed",
  SEARCH = "search",
  SUBMIT = "submit",
  SUCCESS = "success",
  WARNING = "warning",
}

export class ModalType {
  static message(): ModalTypeEnum[] {
    return [
      ModalTypeEnum.CONFIRM,
      ModalTypeEnum.DELETE,
      ModalTypeEnum.ERROR,
      ModalTypeEnum.INFO,
      ModalTypeEnum.NOTIF,
      ModalTypeEnum.PROCEED,
      ModalTypeEnum.SEARCH,
      ModalTypeEnum.SUBMIT,
      ModalTypeEnum.SUCCESS,
      ModalTypeEnum.WARNING,
    ];
  }
}
