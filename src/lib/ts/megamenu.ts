import type { MenuCategoryEnum } from "./enums/menu";

export type MenuState = {
  category: MenuCategoryEnum;
  root: string | null;
  online: boolean;
  darkmode: boolean;
  popover: popoverState;
};

type popoverState = {
  userPanel: boolean;
};
