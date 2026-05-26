/* eslint-disable no-unused-vars */
import {
  ConfirmationIcon,
  CycleIcon,
  DeleteIcon,
  ErrorIcon,
  InfoIcon,
  NotificationIcon,
  SearchIcon,
  SettingsIcon,
  SuccessIcon,
  UserIcon,
  WarningIcon,
} from "$components/icons";
import type { Component } from "svelte";

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

  static ext(type: ModalTypeEnum): Component {
    switch (type) {
      case ModalTypeEnum.CONFIRM:
        return ConfirmationIcon;
      case ModalTypeEnum.DELETE:
        return DeleteIcon;
      case ModalTypeEnum.ERROR:
        return ErrorIcon;
      case ModalTypeEnum.NOTIF:
        return NotificationIcon;
      case ModalTypeEnum.PROCEED:
        return ConfirmationIcon;
      case ModalTypeEnum.SEARCH:
        return SearchIcon;
      case ModalTypeEnum.SUCCESS:
        return SuccessIcon;
      case ModalTypeEnum.WARNING:
        return WarningIcon;
      default:
        return InfoIcon;
    }
  }
}
