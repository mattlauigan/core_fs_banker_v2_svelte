import type { Component } from "svelte";
import type { ModalTypeEnum } from "./enums/modal";
import type { Date } from "./types/app";

export type BaseInputProps = {
  id?: string;
  name?: string;
  type?: string;

  value?: string | number | readonly string[];
  placeholder?: string;

  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;

  autocomplete?: string;
  autofocus?: boolean;

  min?: number | string;
  max?: number | string;
  step?: number | string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;

  checked?: boolean;
};

export type InputEvents = {
  onInput?: (e: Event & { currentTarget: HTMLInputElement }) => void;
  onChange?: (e: Event & { currentTarget: HTMLInputElement }) => void;
  onCheck: (checked: boolean) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
};

export type InputProps = BaseInputProps & InputEvents;

export type ToggleSwitchProps = Required<
  Pick<InputProps, "name" | "checked" | "disabled" | "onCheck">
> & {
  label?: string;
};

export type ButtonProps = {
  label?: string;
  type?: "button" | "submit" | "reset";
  primary?: boolean;
  isLoading?: boolean;
  isReadonly?: boolean;
  isDisabled?: boolean;
  class?: string;
  onClick?: () => void;
};

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  width?: string;
}

export type IconProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
  containerClass?: string;
};

export interface TableAction<T> {
  icon: Component<IconProps>;
  label: string;
  onClick: (row: T) => void;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: TableAction<T>[];
}

export type TextAreaProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  style?: string;
  value?: string;
  rows?: number;
  cols?: number;
  maxlength?: number;
  minlength?: number;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  hasError?: boolean;
};

export type TextInputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  style?: string;
  value?: string;
  max?: number | Date;
  maxlength?: number;
  min?: number | Date;
  minlength?: number;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  hasError?: boolean;
};

export interface ModalActionItem {
  label: string;
  handler: () => void;
  primary?: boolean;
}

export interface ModalSetupConfig {
  icon: Component;
  getActions: (onSubmit: () => void, close: () => void) => ModalActionItem[];
}

export type DialogWindowProps<T> = {
  title?: string;
  show?: boolean;
  message: string;
  modalType?: ModalTypeEnum;
  onSubmit?: () => void;
  actions?: ModalActionItem[];
  icon?: (object: T) => Component;
};
