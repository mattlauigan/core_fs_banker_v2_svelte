import {
  ConfirmationIcon,
  InfoIcon,
  SearchIcon,
  WarningIcon,
} from "$components/primitives/icons";
import ErrorIcon from "$components/primitives/icons/errorIcon.svelte";
import type { ModalSetupConfig } from "$lib/ts/components";
import { ModalTypeEnum } from "$lib/ts/enums/modal";

const MODAL_CONFIGS: Record<ModalTypeEnum, ModalSetupConfig> = {
  [ModalTypeEnum.SUBMIT]: {
    icon: ConfirmationIcon,
    getActions: (onSubmit, close) => [
      { label: "Submit", handler: onSubmit, primary: true },
      { label: "Close", handler: close },
    ],
  },
  [ModalTypeEnum.CONFIRM]: {
    icon: ConfirmationIcon,
    getActions: (onSubmit, close) => [
      { label: "Yes", handler: onSubmit, primary: true },
      { label: "No", handler: close },
    ],
  },
  [ModalTypeEnum.PROCEED]: {
    icon: ConfirmationIcon,
    getActions: (onSubmit, close) => [
      { label: "Proceed", handler: onSubmit, primary: true },
      { label: "Cancel", handler: close },
    ],
  },
  [ModalTypeEnum.DELETE]: {
    icon: WarningIcon,
    getActions: (onSubmit, close) => [
      { label: "Delete", handler: onSubmit, primary: true },
      { label: "Cancel", handler: close },
    ],
  },
  [ModalTypeEnum.WARNING]: {
    icon: WarningIcon,
    getActions: (onSubmit) => [
      { label: "Ok", handler: onSubmit, primary: true },
    ],
  },
  [ModalTypeEnum.ERROR]: {
    icon: ErrorIcon,
    getActions: (onSubmit) => [
      { label: "Ok", handler: onSubmit, primary: true },
    ],
  },
  [ModalTypeEnum.INFO]: {
    icon: InfoIcon,
    getActions: (onSubmit) => [
      { label: "Ok", handler: onSubmit, primary: true },
    ],
  },
  [ModalTypeEnum.SUCCESS]: {
    icon: InfoIcon,
    getActions: (onSubmit) => [
      { label: "Ok", handler: onSubmit, primary: true },
    ],
  },
  [ModalTypeEnum.NOTIF]: {
    icon: InfoIcon,
    getActions: (onSubmit) => [
      { label: "Ok", handler: onSubmit, primary: true },
    ],
  },
  [ModalTypeEnum.SEARCH]: {
    icon: SearchIcon,
    getActions: (onSubmit) => [
      { label: "Search", handler: onSubmit, primary: true },
    ],
  },
};

export function getModalSetup(
  type: ModalTypeEnum,
  onSubmit: () => void,
  close: () => void,
) {
  const config = MODAL_CONFIGS[type] || {
    icon: InfoIcon,
    getActions: (onSubmit) => [
      { label: "Ok", handler: onSubmit, primary: true },
    ],
  };

  return {
    Icon: config.icon,
    actions: config.getActions(onSubmit, close),
  };
}
