import type { MenuCategory } from "./enum";

export type MenuState = {
  category: MenuCategory;
  root: string | null;
  online: boolean;
  darkmode: boolean;
  popover: popoverState;
};

type popoverState = {
  userPanel: boolean;
};
