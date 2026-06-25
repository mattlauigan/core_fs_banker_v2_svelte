/* eslint-disable no-unused-vars */

export enum DisplayMedia {
  base = "table-cell",
  xs = "hidden xs:table-cell",
  sm = "hidden sm:table-cell",
  md = "hidden md:table-cell",
  lg = "hidden lg:table-cell",
  xl = "hidden xl:table-cell",
}
export enum ButtonTypeEnum {
  button,
  submit,
  reset,
}

export enum CheckBoxEnum {
  left = "left",
  right = "right",
}

export enum VariantEnum {
  primary,
  secondary,
  warning,
  danger,
}

export enum AlignMapEnum {
  left = "text-left",
  center = "text-center",
  right = "text-right",
}

export class AlignMap {
  static getAlignmentClass(key: string | null | undefined): string {
    const activeKey = key || "left";

    if (activeKey in AlignMapEnum) {
      return AlignMapEnum[activeKey as keyof typeof AlignMapEnum];
    }

    return AlignMapEnum.left;
  }
}
