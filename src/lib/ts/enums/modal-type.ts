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

// <ConfirmationIcon width={48} height={48} />
// <CycleIcon width={48} height={48} />
// <ErrorIcon width={48} height={48} />
// <InfoIcon width={48} height={48} />
// <NotificationIcon width={48} height={48} />
// <SearchIcon width={48} height={48} />
// <SettingsIcon width={48} height={48} />
// <SuccessIcon width={48} height={48} />
// <UserIcon width={48} height={48} />
// <WarningIcon width={48} height={48} />

// <DeleteIcon width={48} height={48} />
