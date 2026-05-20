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

export type IconProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
  containerClassName?: string;
};
