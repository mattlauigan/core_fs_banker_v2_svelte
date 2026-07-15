import type { MenuCategoryEnum } from "./enums/menu";

export type MenuState = {
  category: MenuCategoryEnum;
  root: string | null;
  
  darkmode: boolean;
  popover: boolean;
};
